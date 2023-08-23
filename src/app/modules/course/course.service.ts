import { Course, PrismaClient } from "@prisma/client";
import httpStatus from "http-status";
import { FilterOption } from "../../../constants/filterOption";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { courseSearchableFields } from "./course.constant";
import { ICourseRequest, IcourseCreateData } from "./course.interface";

const prisma = new PrismaClient();

const insertIntoDB = async (data: IcourseCreateData) => {

    const { preRequisiteCourses, ...courseData } = data;

    const newCourse = await prisma.$transaction(async (tx) => {
        const course = await tx.course.create(
            {
                data: courseData
            }
        )

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            for (let i = 0; i < preRequisiteCourses.length; i++) {
                const createPreRequisite = await tx.courseToPrerequisite.create(
                    {
                        data: {
                            courseId: course.id,
                            preRequisiteId: preRequisiteCourses[i].courseId
                        }
                    })
                console.log(createPreRequisite, "createPreRequisite");

            }

        }
        return course;
    })

    if (newCourse) {
        const response = await prisma.course.findUnique({
            where: {
                id: newCourse.id
            },
            include: {
                preRequisite: {
                    include: {
                        prerequisite: true
                    }
                },
                preRequisiteFor: {
                    include: {
                        course: true
                    }
                }

            }
        })
        return response;

    }

    throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create course")
}




const getAll = async (data:ICourseRequest, options: IPaginationOptions):Promise<IGenericResponse<Course[]>> => {
    const {searchTerm, ...filterData} = data;

    const {limit, page, skip} = paginationHelpers.calculatePagination(options);

    const andCondition = [];

    if(searchTerm){
    const searchResult =  FilterOption.searchFilter(searchTerm, courseSearchableFields);
    andCondition.push(searchResult);
    }

    if(Object.keys(filterData).length > 0){
        const filterResult = FilterOption.filterCondition(filterData);
        andCondition.push(...filterResult);
    }

    const whereCondition = andCondition.length > 0 ? {AND: andCondition} : {};

    const result = await prisma.course.findMany({
        where: whereCondition,
        take: limit,
        skip,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        }
        : {
            createdAt: 'desc'
        },
        include: {
            preRequisite: {
                include: {
                    prerequisite: true
                }
            },
            preRequisiteFor: {
                include: {
                    course: true
                }

            }
        }
    }) 

    const total = await prisma.course.count({
        where: whereCondition
    })

    return{
        data: result,
        meta:{
            total,
            page,
            limit,
        }
    }


}
export const CourseService = {
    insertIntoDB,
    getAll,
}