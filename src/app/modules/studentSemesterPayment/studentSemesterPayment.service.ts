import { Prisma, PrismaClient, StudentSemesterPayment } from "@prisma/client";
import { DefaultArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { FilterOption } from "../../../constants/filterOption";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { studentSemesterPaymentRelationalFields, studentSemesterPaymentRelationalFieldsMapper, studentSemesterPaymentSearchableFields } from "./studentSemesterPayment.constant";
import { IStudentSemesterPaymentFilterRequest } from "./studentSemesterPayment.interface";


const prisma = new PrismaClient();


const createPayment = async (
    prismaClient: Omit<PrismaClient<PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">,
    payload: {
        studentId: string;
        academicSemesterId: string;
        totalPaymentAmount: number;
    }
) => {
    console.log(payload, 'payload from payment');
    
    const isExist = await prismaClient.studentSemesterPayment.findFirst({
        where: {
           student:{
            id: payload.studentId
           },
              academicSemester:{
                id: payload.academicSemesterId
              }
        }
    })

    if(!isExist){
        const dataToInsert = {
            studentId: payload.studentId,
            academicSemesterId: payload.academicSemesterId,
            fullPaymentAmount: payload.totalPaymentAmount,
            partialPaymentAmount: payload.totalPaymentAmount * 0.5,
            totalDueAmount: payload.totalPaymentAmount ,
            tatalPaidAmount: 0,
        }

    const result =    await prismaClient.studentSemesterPayment.create({
            data: dataToInsert
        })
        console.log(result, 'result');
    }
}



const getAll = async (
    options: IPaginationOptions,
    filterOption: IStudentSemesterPaymentFilterRequest,
):Promise<IGenericResponse<StudentSemesterPayment[]>>=>{

    const { searchTerm,  ...filterData} = filterOption;
    const {limit,skip,page}  = paginationHelpers.calculatePagination(options);


    const andCondition = [];

    if(searchTerm){
        const result =  FilterOption.searchFilter(searchTerm,studentSemesterPaymentSearchableFields );
        andCondition.push(result);
    }

    if(Object.keys(filterData).length){
        const result = FilterOption.objectFilter(
            filterData,
            studentSemesterPaymentRelationalFields,
            studentSemesterPaymentRelationalFieldsMapper
        )
        andCondition.push(...result);
}

    const whereCondition:  Prisma.StudentSemesterPaymentWhereInput = andCondition.length > 0 ? {
        AND: andCondition
    } : {};

    const result = await prisma.studentSemesterPayment.findMany({
        include: {
            academicSemester: true,
            student: true
        },
        where: whereCondition,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                    createdAt: 'desc'
                }
    });

    const total = await prisma.studentSemesterPayment.count({
        where: whereCondition
    });


    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
}

export const StudentSemesterPaymentService = {
    createPayment,
    getAll
}