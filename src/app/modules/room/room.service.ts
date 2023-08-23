import { PrismaClient, Room } from "@prisma/client";
import { FilterOption } from "../../../constants/filterOption";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { roomRelationalFields, roomRelationalFieldsMapper, roomSearchableFields } from "./room.constant";
import { IRoomFilterRequest } from "./room.interface";

const prisma = new PrismaClient();

const insertIntoDB = async (data: Room): Promise<Room> => {

    const result = await prisma.room.create({
        data,
        include:{
            building: true
        }
    }
    
    );


    return result;

}


const getAll = async (
    filters: IRoomFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<Room[]>> => {
    const { searchTerm, ...filterOption } = filters;
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);

    const andCondition = [];

    if (searchTerm) {
        const searchResult = FilterOption.searchFilter(searchTerm, roomSearchableFields)

        andCondition.push(searchResult)
    }

    if (Object.keys(filterOption).length > 0) {
        const filterResult = FilterOption.objectFilter(filterOption, roomRelationalFields, roomRelationalFieldsMapper);

        andCondition.push(...filterResult)
    }

    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};

    const result = await prisma.room.findMany({
        where: whereCondition,
        include: {
            building: true
        },
        take: limit,
        skip,
        orderBy: options.sortBy && options.sortOrder ?
            {
                [options.sortBy]: options.sortOrder
            } : {
                createdAt: 'desc'
            }

    })

    const total = await prisma.room.count({
        where: whereCondition
    })

    return {
        data: result,
        meta: {
            total,
            page,
            limit
        }
    }

}


const getById = async (id: string): Promise<Room | null> => {
    console.log(id,'id');
    
    const result = await prisma.room.findUnique({
        where: {
            id
        },
        include: {
           building : true
        }
    })

    console.log(result,'result');
    
    return result;
}


const updateById = async (id: string, payload: Partial<Room>): Promise<Room | null> => {

    const result = await prisma.room.update({
        where: {
            id
        },
        data: payload,
        include: {
            building: true
        }
    })

    return result;
}


const deleteById = async (id: string): Promise<Room | null> => {
    const result = await prisma.room.delete({
        where: {
            id
        }
    })

    return result;
}



export const RoomService = {
    insertIntoDB,
    getAll,
    getById,
    updateById,
    deleteById,
    
}