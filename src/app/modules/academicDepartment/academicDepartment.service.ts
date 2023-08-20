/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicDepartment, PrismaClient } from '@prisma/client';
import searchFilter from '../../../constants/filterOption';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicDepartmentRelationalFields, academicDepartmentRelationalFieldsMapper, academicDepartmentSearchableFields } from './academicDepartment.constant';
import { IAcademicDepartmentFilterRequest } from './academicDepartment.interface';

const prisma = new PrismaClient();

const insertIntoDB = async (data: AcademicDepartment) => {
    const result = await prisma.academicDepartment.create({
        data,
        include: {
            academicFaculty: true
        }
    })
    return result;
}


const getAll = async (filter: IAcademicDepartmentFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[]>> => {


    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);

    const { searchTerm, ...filterOptions } = filter;

    const andConditon = [];

    let search = {};

    if (searchTerm) {
        search = searchFilter(searchTerm, academicDepartmentSearchableFields);
    }

    andConditon.push(search)


    //   now here i want merge the search inside andConditon array

    andConditon.push(search);

    if (Object.keys(filterOptions).length > 0) {
        andConditon.push(
            {
                AND: Object.keys(filterOptions).map((key) => {
                    if (academicDepartmentRelationalFields.includes(key)) {
                        return {
                            [academicDepartmentRelationalFieldsMapper[key]]: {
                                id: (filterOptions as any)[key]
                            }
                        }
                    } else {
                        return {
                            [key]: {
                                equals: (filterOptions as any)[key]
                            }
                        }
                    }
                })
            }
        )
    }

    const whereCondition = andConditon.length > 0 ? { AND: andConditon } : {};



    const result = await prisma.academicDepartment.findMany({
        include: {
            academicFaculty: true
        },
        where: whereCondition,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder ? {
                [sortBy]: sortOrder
            } : {
                createdAt: 'desc'

            }
    })

    const total = await prisma.academicDepartment.count({
        where: whereCondition
    })



    return {
        meta: {
            limit,
            page,
            total
        },
        data: result
    };
}


const getById = async (id: string): Promise<AcademicDepartment | null> => {
    const result = await prisma.academicDepartment.findUnique({
        where: {
            id
        },
        include: {
            academicFaculty: true
        }
    })
    return result;
}


export const academicDepartmentService = {
    insertIntoDB,
    getAll,
    getById
}