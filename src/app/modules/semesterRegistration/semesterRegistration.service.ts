import { PrismaClient, SemesterRegistration } from "@prisma/client";
import httpStatus from "http-status";
import { FilterOption } from "../../../constants/filterOption";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { SemesterRegistrationRelationalFields, SemesterRegistrationRelationalFieldsMapper, SemesterRegistrationSearchableFields } from "./semesterRegistration.contant";
import { ISemesterRegRequest } from "./semesterRegistration.interface";


const prisma = new PrismaClient();



const insertIntoDB = async (data: SemesterRegistration) => {

    const isAnySemesterRegUpcomingOrOngoing = await prisma.semesterRegistration.findFirst({
        where: {
            OR: [
                {
                    status: "UPCOMING"
                },
                {
                    status: "ONGOING"
                }
            ]
        }
    })

    if (isAnySemesterRegUpcomingOrOngoing) {
        throw new ApiError(httpStatus.BAD_REQUEST, `There is already an ${data.status}  semester registration`)
    }

    return await prisma.semesterRegistration.create({
        data: {
            ...data
        }
    })
}


const getAll = async (
    filters: ISemesterRegRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<SemesterRegistration[]>> => {

    const {searchTerm, ...filterData} = filters;
    const {limit, skip, page, } = paginationHelpers.calculatePagination(options)

    const andConditions = [];

    if (searchTerm) {
        const result = FilterOption.searchFilter(searchTerm, SemesterRegistrationSearchableFields);
        andConditions.push(result)
    }

    if(Object.keys(filterData).length > 0) {
        const result = FilterOption.objectFilter(filterData, SemesterRegistrationRelationalFields, SemesterRegistrationRelationalFieldsMapper );
        andConditions.push(...result)
    }

    const whereAndCondition = andConditions.length > 0 ? {
        AND: andConditions
    } : {}

    const result = await prisma.semesterRegistration.findMany({
        where: {
            ...whereAndCondition
        },
        include: {
            academicSemester: true
        },
        take: limit,
        skip: skip
    })

    const total = await prisma.semesterRegistration.count({
        where: {
            ...whereAndCondition
        }
    })

    return {
        data: result,
        meta: {
            limit,
            total,
            page,
        }
    }

}

const getById = async (id: string) => {
     
    const result = await prisma.semesterRegistration.findUnique({
        where: {
            id
        },
        include: {
            academicSemester: true
        }
        
    })

    return result;
}

const updateById = async (id: string, data: SemesterRegistration) => {
    const result = await prisma.semesterRegistration.update({
        where: {
            id
        },
        data: {
            ...data
        }
    })

    return result;
}


const deleteById = async (id: string) => {
    const result = await prisma.semesterRegistration.delete({
        where: {
            id
        }
    })

    return result;
}




export const SemesterRegistrationService = {
    insertIntoDB,
    getAll,
    getById,
    updateById,
    deleteById
}
