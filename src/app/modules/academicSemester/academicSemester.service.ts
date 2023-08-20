import { AcademicSemester, PrismaClient } from "@prisma/client";
import searchFilter from "../../../constants/searchFilter";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicSemesterSearchableFields } from "./academicSemester.constant";
import { IAcademicSemesterFilterRequest } from "./academicSemester.interface";


const prisma = new PrismaClient();

const insertIntoDB = async (data: AcademicSemester): Promise<AcademicSemester> => {
    const result = await prisma.academicSemester.create({
        data
    })
    return result;
}



const getAll = async (filter: IAcademicSemesterFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<AcademicSemester[]>> => {
    
        const { limit, page, skip, } = paginationHelpers.calculatePagination(options);
        const { searchTerm, ...filterOptions } = filter;
        const andCondition = [];
        const search = {};
        if (searchTerm) {
            searchFilter(searchTerm, academicSemesterSearchableFields);
        }
        andCondition.push(search)
    
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
            meta:{
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



export const academicSemesterService = {
    insertIntoDB,
    getAll,
    getById
}