import { Building, PrismaClient } from "@prisma/client";
import { FilterOption } from "../../../constants/filterOption";
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


const getAll = async (filters: IBuildingFilterRequest, options: IPaginationOptions): Promise<
    IGenericResponse<Building[] | null>
> => {
    const { limit, page, skip, } = paginationHelpers.calculatePagination(options);

    const { searchTerm } = filters;
    const andCondition = [];
    if (searchTerm) {
        const search = FilterOption.searchFilter(searchTerm, buildingSearchableFields);
        andCondition.push(search);
    }

    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};

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

    return {
        data: result,
        meta: {
            total,
            page,
            limit,
        }

    }
}

const getById = async (id: string): Promise<Building | null> => {
    const result = await prisma.building.findUnique({
        where: {
            id
        },
        include: {
            rooms: true
        }
    })
    return result;
}


const updateById = async (id: string, payload: Partial<Building>): Promise<Building | null> => {

    const result = await prisma.building.update({
        where: {
            id
        },
        data: payload
    })
    return result;
}

const deleteById = async (id: string): Promise<Building | null> => {
    const result = await prisma.building.delete({
        where: {
            id
        }
    })
    return result;
}






export const BuildingService = {
    insertIntoDB,
    getAll,
    getById,
    updateById,
    deleteById,
}