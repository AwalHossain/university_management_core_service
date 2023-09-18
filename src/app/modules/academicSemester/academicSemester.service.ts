/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicSemester, PrismaClient } from "@prisma/client";
import { FilterOption } from "../../../constants/filterOption";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { RedisClient } from "../../../shared/redis";
import { EVENT_ACADEMIC_SEMESTER_CREATED, EVENT_ACADEMIC_SEMESTER_DELETED, EVENT_ACADEMIC_SEMESTER_UPDATED, academicSemesterSearchableFields, academicSemesterTitleCodeMappping } from "./academicSemester.constant";
import { IAcademicSemesterFilterRequest } from "./academicSemester.interface";


const prisma = new PrismaClient();

const insertIntoDB = async (data: AcademicSemester): Promise<AcademicSemester> => {

    if (academicSemesterTitleCodeMappping[data.title] !== data.code) {
        throw new Error('Invalid title and code combination')
    }

    const result = await prisma.academicSemester.create({
        data
    })

    if (result) {
        RedisClient.publish(EVENT_ACADEMIC_SEMESTER_CREATED, JSON.stringify(result));
    }

    return result;
}



const getAll = async (filter: IAcademicSemesterFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<AcademicSemester[]>> => {

    const { limit, page, skip, } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterOptions } = filter;
    const andCondition = [];
    if (searchTerm) {
        const search = FilterOption.searchFilter(searchTerm, academicSemesterSearchableFields);
        andCondition.push(search)
        andCondition.push(search)
    }

    if (Object.keys(filterOptions).length > 0) {
        andCondition.push({
            AND: Object.keys(filterOptions).map((key) => {
                return {
                    [key]: {
                        equals: (filterOptions as any)[key]
                    }
                }
            })
        }
        )
    }

    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};

    const result = await prisma.academicSemester.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {},
    })

    const total = await prisma.academicSemester.count({
        where: whereCondition
    })

    return {
        data: result,
        meta: {
            total,
            page,
            limit,
        }
    }
}

const getById = async (id: string): Promise<AcademicSemester | null> => {
    const result = await prisma.academicSemester.findUnique({
        where: {
            id
        }
    })
    return result;
}

const updateById = async (id: string, data: AcademicSemester): Promise<AcademicSemester> => {
    const result = await prisma.academicSemester.update({
        where: {
            id
        },
        data
    })

    if (result) {
        RedisClient.publish(EVENT_ACADEMIC_SEMESTER_UPDATED, JSON.stringify(result));
    }

    return result;
}

const deleteById = async (id: string): Promise<AcademicSemester> => {
    const result = await prisma.academicSemester.delete({
        where: {
            id
        }
    })

    if (result) {
        RedisClient.publish(EVENT_ACADEMIC_SEMESTER_DELETED, JSON.stringify(result));
    }
    return result;
}






export const academicSemesterService = {
    insertIntoDB,
    getAll,
    getById,
    updateById,
    deleteById
}