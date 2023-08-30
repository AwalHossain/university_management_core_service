import { OfferedCourseClassSchedule, PrismaClient } from "@prisma/client";
import { OfferedCourseClassScheduleUtils } from "./OfferedCourseClassSchedule.utils";



const prisma = new PrismaClient();

const insertIntoDb = async (data: OfferedCourseClassSchedule) => {
    await OfferedCourseClassScheduleUtils.checkRoomAvailibility(data);
    await OfferedCourseClassScheduleUtils.facultyAvailabililty(data);

    const result = await prisma.offeredCourseClassSchedule.create({
        data,
        include: {
            room: true,
            faculty: true,
            offeredCourseSection: true,
            semesterRegistration: true
        }
    })

    return result;
}


export const OfferedCourseClassScheduleService = {
    insertIntoDb
}