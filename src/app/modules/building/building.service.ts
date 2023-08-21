import { Building, PrismaClient } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { buildingSearchableFields } from "./building.contant";
import { IBuildingFilterRequest } from "./building.interface";



const prisma = new PrismaClient();

const insertIntoDB = async (data: Building): Promise<Building> => {
    const result = await prisma.building.create({
        data
    })
    return result;
}


const getAll = async (filters:IBuildingFilterRequest, options:IPaginationOptions): Promise<
IGenericResponse< Building[]| null>
> => {
        const { limit, page, skip, } = paginationHelpers.calculatePagination(options);

        const {searchTerm} = filters;
        const andCondition = [];
        if(searchTerm){
           andCondition.push({
                OR: buildingSearchableFields.map((field)=>(
                    {
                        [field]: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    }
                ))
           })
        }

        const whereCondition = andCondition.length > 0 ? {AND: andCondition} :{};

        const result = await prisma.building.findMany({
            where: whereCondition,
            take: limit,
            skip,
            orderBy: options.sortBy && options.sortOrder ? {
                [options.sortBy]: options.sortOrder
            }
            : {
                createdAt: 'desc'
            }
        })

        const total = await prisma.building.count({
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


export const BuildingService = {
    insertIntoDB,
    getAll
}