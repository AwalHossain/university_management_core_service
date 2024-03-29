import { OfferedCourse, PrismaClient } from "@prisma/client";
import httpStatus from "http-status";
import { FilterOption } from "../../../constants/filterOption";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { asyncForEach } from "../../../shared/utils";
import { offeredCourseRelationalFields, offeredCourseRelationalFieldsMapper, offeredCourseSearchFields } from "./offeredCourse.constant";
import { ICreateOfferCourse, IOfferCourseFilterReq } from "./offeredCourse.interface";

const prisma = new PrismaClient();

const insertIntoDB  = async (
    data: ICreateOfferCourse
)=> {
        const { courseIds, academicDepartmentId, semesterRegistrationId } = data;   
        const offeredCourses: OfferedCourse[] = [];
      await  asyncForEach(courseIds, async (courseId) => {
            const existingOfferedCourse = await prisma.offeredCourse.findFirst({
                where: {
                    courseId,
                    academicDepartmentId,
                    semesterRegistrationId
                }

            });
            console.log(existingOfferedCourse, 'existingOfferedCourse');
            
            if (!existingOfferedCourse) {
          const insertedCourse =  await prisma.offeredCourse.create({
                    data: {
                        courseId,
                        academicDepartmentId,
                        semesterRegistrationId
                    },
                    include: {
                        course: true,
                        academicDepartment: true,
                        semesterRegistration: true
                    }
                });
                offeredCourses.push(insertedCourse);
            }


            console.log(offeredCourses, 'offeredCourses');
        });
        console.log(offeredCourses, 'offeredCourses');
        return offeredCourses;
}



const getAll = async (
    filterData: IOfferCourseFilterReq,
    options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourse[]>> => {

    const {searchTerm, ...filterOptions } = filterData;
    const { skip,limit,page  } = paginationHelpers.calculatePagination(options);


    const andConditoins = [];

    if(searchTerm){
    const result =  FilterOption.searchFilter(searchTerm, offeredCourseSearchFields);
    andConditoins.push(result);
    }


    if(Object.keys(filterOptions).length > 0){
        const result =  FilterOption.objectFilter(filterOptions, offeredCourseRelationalFields, offeredCourseRelationalFieldsMapper);
        andConditoins.push(...result);
    }

    const whereCondition = andConditoins.length > 0 ? {
        AND: andConditoins
    } : {};

    const result = await prisma.offeredCourse.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        },
        include: {
            course: true,
            academicDepartment: true,
            semesterRegistration: true
        }
    });

    const count = await prisma.offeredCourse.count({
        where: whereCondition
    });


    return {
        data: result,
        meta:{
            total: count,
            page,
            limit,
        }
    }    
}



const getById = async (id: string): Promise<OfferedCourse | null> => {

    const result = await prisma.offeredCourse.findUnique({
        where: {
            id
        },
        include: {
            course: true,
            academicDepartment: true,
            semesterRegistration: true
        }
    });

    if(!result){
     throw new ApiError(httpStatus.NOT_FOUND, 'OfferedCourse not found');
    }
    console.log(result, 'result');
    
    return result;
}


const updateById = async (id: string, data: Partial<ICreateOfferCourse>): Promise<OfferedCourse | null> => {
    const result = await prisma.offeredCourse.update({
        where: {
            id
        },
        data,
        include: {
            course: true,
            academicDepartment: true,
            semesterRegistration: true
        }
    });


    return result;

}


const deleteById = async (id: string): Promise<OfferedCourse> => {
    const result = await prisma.offeredCourse.delete({
        where: {
            id
        },
        include: {
            semesterRegistration: true,
            course: true,
            academicDepartment: true
        }
    });
    return result;
};


export const OfferedCourseService= {
    insertIntoDB,
    getAll,
    getById,
    updateById,
    deleteById
}
