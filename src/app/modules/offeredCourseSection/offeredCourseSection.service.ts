import { OfferedCourseSection, PrismaClient } from "@prisma/client";
import httpStatus from "http-status";
import { FilterOption } from "../../../constants/filterOption";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import {
  offeredCourseSectionFilterableFields,
  offeredCourseSectionRelationFieldsMapper,
  offeredCourseSectionSearchableFields
} from "./offeredCourseSection.constant";
import { IOfferedCourseSectionFilterRequest } from "./offeredCourseSection.interface";

const prisma = new PrismaClient();

const insertIntoDB = async (data: OfferedCourseSection): Promise<OfferedCourseSection> => {
  const { offeredCourseId,  } = data;
  const isExistOfferedCourse = await prisma.offeredCourse.findFirst({
    where: {
     id: offeredCourseId,
    },
  });

  if (!isExistOfferedCourse) {
    throw new ApiError(httpStatus.BAD_REQUEST,"OfferedCourse not found");
}

data.semesterRegistrationId = isExistOfferedCourse.semesterRegistrationId;

const insertedOfferedCourseSection = await prisma.offeredCourseSection.create({
  data,
  include: {
    offeredCourse: true,
    semesterRegistration: true,
  },
});

return insertedOfferedCourseSection;
};

const getAll = async (
  filterData: IOfferedCourseSectionFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourseSection[]>> => {
  const { searchTerm, ...filterOptions } = filterData;
  const { skip, limit, page } = paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (searchTerm) {
    const result = FilterOption.searchFilter(searchTerm, offeredCourseSectionSearchableFields);
    andConditions.push(result);
  }

  if (Object.keys(filterOptions).length > 0) {
    const result = FilterOption.objectFilter(
      filterOptions,
      offeredCourseSectionFilterableFields,
      offeredCourseSectionRelationFieldsMapper
    );
    andConditions.push(...result);
  }

  const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCourseSection.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: "desc" },
    include: {
      offeredCourse: true,
    },
  });

  const count = await prisma.offeredCourseSection.count({
    where: whereCondition,
  });

  return {
    data: result,
    meta: {
      total: count,
      page,
      limit,
    },
  };
};

const getById = async (id: string): Promise<OfferedCourseSection | null> => {
  const result = await prisma.offeredCourseSection.findUnique({
    where: {
      id,
    },
    include: {
      offeredCourse: true,
    },
  });

  return result;
};

const updateById = async (
  id: string,
  data: Partial<OfferedCourseSection>
): Promise<OfferedCourseSection | null> => {
  const result = await prisma.offeredCourseSection.update({
    where: {
      id,
    },
    data,
    include: {
      offeredCourse: true,
    },
  });

  return result;
};

const deleteById = async (id: string): Promise<OfferedCourseSection> => {
  const result = await prisma.offeredCourseSection.delete({
    where: {
      id,
    },
    include: {
      offeredCourse: true,
    },
  });

  return result;
};

export const OfferedCourseSectionService = {
  insertIntoDB,
  getAll,
  getById,
  updateById,
  deleteById,
};