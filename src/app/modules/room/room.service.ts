import { PrismaClient, Room } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDB = async(data: Room): Promise<Room>  => {

    const result = await prisma.room.create({
        data
    });


    return result;

}


export const RoomService = {
    insertIntoDB
}