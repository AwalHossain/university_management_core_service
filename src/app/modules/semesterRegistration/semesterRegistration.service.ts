import { PrismaClient, SemesterRegistration } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";


const prisma = new PrismaClient();



const insertIntoDB = async (data: SemesterRegistration) => {

    const isAnySemesterRegUpcomingOrOngoing = await prisma.semesterRegistration.findFirst({
        where: {
            OR: [
                {
                    status: "UPCOMING"
                },
                {
                    status: "ONGOING"
                }
            ]
        }
    })

    if (isAnySemesterRegUpcomingOrOngoing) {
        throw new ApiError(httpStatus.BAD_REQUEST, `There is already an ${data.status}  semester registration`)
    }

    return await prisma.semesterRegistration.create({
        data: {
            ...data
        }
    })
}


export const SemesterRegistrationService = {
    insertIntoDB
}
