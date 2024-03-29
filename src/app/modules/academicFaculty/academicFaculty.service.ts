/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicFaculty, PrismaClient } from "@prisma/client";

import { FilterOption } from "../../../constants/filterOption";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { RedisClient } from "../../../shared/redis";
import { IAcademicFacultyFilterRequest } from "./academicFacult.interface";
import { EVENT_ACADEMIC_FACULTY_CREATED, EVENT_ACADEMIC_FACULTY_DELETED, EVENT_ACADEMIC_FACULTY_UPDATED, academicFacultySearchableFields } from "./academicFaculty.constant";



const prisma = new PrismaClient();

const insertIntoDB = async (data: AcademicFaculty): Promise<AcademicFaculty> => {
    const result = await prisma.academicFaculty.create({
        data,
    })

    if (result) {
        RedisClient.publish(EVENT_ACADEMIC_FACULTY_CREATED, JSON.stringify(result));
    }
    return result;
}


const getAll = async (filter: IAcademicFacultyFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<AcademicFaculty[]>> => {

    const { limit, page, skip, } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterOptions } = filter;
    const andCondition = [];
    if (searchTerm) {
        const search = FilterOption.searchFilter(searchTerm, academicFacultySearchableFields);
        andCondition.push(search)
    }

    if (Object.keys(filterOptions).length > 0) {
        const result = FilterOption.filterCondition(filterOptions);
        andCondition.push(...result);
    }

    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};

    const result = await prisma.academicFaculty.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {},
    })

    const total = await prisma.academicFaculty.count({
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


const getById = async (id: string): Promise<AcademicFaculty | null> => {

    const result = await prisma.academicFaculty.findUnique({
        where: {
            id
        }
    })
    return result;
}

const updateById = async (id: string, data: AcademicFaculty): Promise<AcademicFaculty | null> => {

    const result = await prisma.academicFaculty.update({
        where: {
            id
        },
        data
    })

    if (result) {
        RedisClient.publish(EVENT_ACADEMIC_FACULTY_UPDATED, JSON.stringify(result));
    }

    return result;
}

const deleteById = async (id: string): Promise<AcademicFaculty | null> => {

    const result = await prisma.academicFaculty.delete({
        where: {
            id
        }
    })
    if (result) {
        RedisClient.publish(EVENT_ACADEMIC_FACULTY_DELETED, JSON.stringify(result));
    }
    return result;
}



export const AcademicFacultyService = {
    insertIntoDB,
    getAll,
    getById,
    updateById,
    deleteById,
}