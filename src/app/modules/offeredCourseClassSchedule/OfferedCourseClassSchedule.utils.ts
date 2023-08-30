import { OfferedCourseClassSchedule, PrismaClient } from "@prisma/client"
import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import { hasTimeConflict } from "../../../shared/utils"

const prisma = new PrismaClient

const checkRoomAvailibility = async (data: OfferedCourseClassSchedule) => {

    const alreadyBookedRoomOnDay = await prisma.offeredCourseClassSchedule.findMany({
        where: {
            dayOfWeek: data.dayOfWeek,
            room: {
                id: data.roomId
            }
        }
    })

    const existingSlots = alreadyBookedRoomOnDay.map((schedule) => {
        return {
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        dayOfWeek: schedule.dayOfWeek
    }})

    const newSlots = {
        startTime: data.startTime,
        endTime: data.endTime,
        dayOfWeek: data.dayOfWeek
    }

    if(hasTimeConflict(newSlots, existingSlots)) {
        throw new ApiError(httpStatus.CONFLICT, "Room is already booked!")
    }

}


const facultyAvailabililty = async ( data: OfferedCourseClassSchedule) => {

    const alreadyFacultyAssigned = await prisma.offeredCourseClassSchedule.findMany({
        where: {
            dayOfWeek: data.dayOfWeek,
            faculty: {
                id: data.facultyId
            }
        }
    })

    const existingSlots = alreadyFacultyAssigned.map((schedule) => {
        return {
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            dayOfWeek: schedule.dayOfWeek
        }
    })

    const newSlots = {
        startTime: data.startTime,
        endTime: data.endTime,
        dayOfWeek: data.dayOfWeek
    }

    if(hasTimeConflict(newSlots, existingSlots)) {
        throw new ApiError(httpStatus.CONFLICT, "Faculty is already assigned!")
    }

 

}

export const OfferedCourseClassScheduleUtils = {
    checkRoomAvailibility,
    facultyAvailabililty
}