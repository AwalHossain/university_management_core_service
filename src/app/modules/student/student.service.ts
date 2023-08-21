import { PrismaClient, Student } from "@prisma/client";
import { FilterOption } from "../../../constants/filterOption";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { studentRelationalFields, studentRelationalFieldsMapper, studentSearchableFields } from "./student.constant";
import { IStudentFilterRequest } from "./student.interface";

const prisma = new PrismaClient();


const insertIntoDB =async(data: Student) => {
    const result = await prisma.student.create({
        data
    });
    return result;
}



const getAll= async (filter: IStudentFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Student[]>> => {

    const { page, limit,skip } = paginationHelpers.calculatePagination(options);
    const {searchTerm, ...filterData}  = filter;

    const andCondition = [];

    if(searchTerm){
     const search =  FilterOption.searchFilter(searchTerm, studentSearchableFields);
     andCondition.push(search);
    }


    if(Object.keys(filterData).length>0){
      const result =  FilterOption.objectFilter(filterData, studentRelationalFields, studentRelationalFieldsMapper)
      andCondition.push(...result);
    }

    const whereCondition = andCondition.length>0?{ AND: andCondition }:{};

    const result = await prisma.student.findMany({
        where: whereCondition,
        skip,
        take : limit,
        orderBy: options.sortOrder && options.sortBy ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
    });

    const total = await prisma.student.count({
        where: whereCondition
    });

    return {
        data: result,
        meta: {
            total,
            page,
            limit,
        }
    }


}

const getById = async (id: string) => {
    const result = await prisma.student.findUnique({
        where: {
            id
        }
    });
    return result;
}



export const StudentService = {
    insertIntoDB,
    getAll,
    getById
}