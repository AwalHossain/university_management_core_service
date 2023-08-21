/* eslint-disable @typescript-eslint/no-explicit-any */
import { Faculty, Prisma, PrismaClient } from "@prisma/client";
import { FilterOption } from "../../../constants/filterOption";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { facultyRelationalFields, facultyRelationalFieldsMapper, facultySearchableFields } from "./faculty.constant";
import { IFacultyFilterRequest } from "./faculty.interface";



const prisma = new PrismaClient();

const insertIntoDB = async (data: Faculty): Promise<Faculty> => {
    const result = await prisma.faculty.create({
        data,
        include: {
            academicFaculty: true,
            academicDepartment: true,
        },
    })
    return result;
}



const getAll = async (filter: IFacultyFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Faculty[]>> => {
    
        const { limit, page, skip, } = paginationHelpers.calculatePagination(options);
        const { searchTerm, ...filterOptions } = filter;
        const andCondition = [];
        if (searchTerm) {
            const search = FilterOption.searchFilter(searchTerm, facultySearchableFields);
            andCondition.push(search);
        }
    
        if (Object.keys(filterOptions).length > 0) {
            const result =  FilterOption.objectFilter(filterOptions, facultyRelationalFields, facultyRelationalFieldsMapper)
            andCondition.push(...result);
        }
    
        const whereCondition:Prisma.FacultyWhereInput = andCondition.length > 0 ? { AND: andCondition } : {};
    
        const result = await prisma.faculty.findMany({
            where: whereCondition,
            skip,
            take: limit,
            orderBy: options.sortBy && options.sortOrder ? {
                [options.sortBy]: options.sortOrder
            } : {},
        })
    
        const total = await prisma.faculty.count({
            where: whereCondition
        })
    
        return {
            data: result,
            meta:{
                total,
                page,
                limit,
            }
        }
    }

const getById = async (id: string): Promise<Faculty | null> => {
    const result = await prisma.faculty.findUnique({
        where: {
            id
        }
    })
    return result;
}




export const FacultyService = {
    insertIntoDB,
    getAll,
    getById
}