import { PrismaClient, SemesterRegistrationStatus } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IEnrollCousePayload } from "../semesterRegistration/semesterRegistration.interface";


const prisma = new PrismaClient();


const enrollIntoCourse = async (authUserId: string, payload: IEnrollCousePayload) => {
        
    const studentInfo  = await prisma.student.findFirst({
        where:{
            studentId: authUserId
        }
    })
    console.log(studentInfo,'studentInfo');
    
    const semesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
        where: {
            status: SemesterRegistrationStatus.ONGOING
        },
        include: {
        }
    })

    const offeredCourse = await prisma.offeredCourse.findFirst({
        where: {
            id: payload.offeredCourseId
        },
        include: {
            course: true
        }
    })


    const offeredCourseSection = await prisma.offeredCourseSection.findFirst({
        where: {
            id: payload.offeredCourseSectionId
        }
    })

    if(!studentInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
    }

    if(!semesterRegistrationInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Semester registration not found')
    }

    if(!offeredCourse) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Offered course not found')
    }

    if(!offeredCourseSection) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Offered course section not found')
    }

    if(offeredCourseSection.maxCapacity
        && offeredCourseSection.currentlyEnrolledStudent &&
        offeredCourseSection.maxCapacity <= offeredCourseSection.currentlyEnrolledStudent) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Offered course section is full')
        }

 
        

    await prisma.$transaction(
        async (tx) => {
            await tx.studentSemesterRegistrationCourse.create({
                data:{
                    studentId: studentInfo?.id,
                    semesterRegistrationId: semesterRegistrationInfo?.id,
                    offeredCourseSectionId: payload.offeredCourseSectionId,
                    offeredCourseId: payload.offeredCourseId,
                }
            })


            await tx.offeredCourseSection.update({
                where: {
                    id: payload.offeredCourseSectionId,
                },
                data: {
                    currentlyEnrolledStudent: {
                    increment: 1
                    }
                }
            })

            await tx.studentSemesterRegistration.updateMany({
                where: {
                    student:{
                        id: studentInfo?.id
                    },
                    semesterRegistration: {
                        id: semesterRegistrationInfo?.id
                    }
                },
                data: {
                    totalCredit: {
                        increment: offeredCourse.course.credits
                    }
                }
            })

        }
        
    )

    return{
        message: 'Course enrolled successfully'
    }

}


const withdrawCourse = async (authUserId: string, payload: IEnrollCousePayload) => {

    
    const studentInfo  = await prisma.student.findFirst({
        where:{
            studentId: authUserId
        }
    })
    const semesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
        where: {
            status: SemesterRegistrationStatus.ONGOING
        },
        include: {
        }
    })

    const offeredCourse = await prisma.offeredCourse.findFirst({
        where: {
            id: payload.offeredCourseId
        },
        include: {
            course: true
        }
    })


    const offeredCourseSection = await prisma.offeredCourseSection.findFirst({
        where: {
            id: payload.offeredCourseSectionId
        }
    })

    if(!studentInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
    }

    if(!semesterRegistrationInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Semester registration not found')
    }

    if(!offeredCourse) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Offered course not found')
    }

    if(!offeredCourseSection) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Offered course section not found')
    }

    if(offeredCourseSection.maxCapacity
        && offeredCourseSection.currentlyEnrolledStudent &&
        offeredCourseSection.maxCapacity <= offeredCourseSection.currentlyEnrolledStudent) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Offered course section is full')
        }


    await prisma.$transaction(
        async (tx) => {
            await tx.studentSemesterRegistrationCourse.delete({
                where:{
                    semesterRegistrationId_studentId_offeredCourseId:{
                        semesterRegistrationId: semesterRegistrationInfo?.id,
                        studentId: studentInfo?.id,
                        offeredCourseId: payload.offeredCourseId
                    }
                }
            })


            await tx.offeredCourseSection.update({
                where: {
                    id: payload.offeredCourseSectionId,
                },
                data: {
                    currentlyEnrolledStudent: {
                    decrement: 1
                    }
                }
            })

            await tx.studentSemesterRegistration.updateMany({
                where: {
                    student:{
                        id: studentInfo?.id
                    },
                    semesterRegistration: {
                        id: semesterRegistrationInfo?.id
                    }
                },
                data: {
                    totalCredit: {
                        decrement: offeredCourse.course.credits
                    }
                }
            })

        }
        
    )

    return{
        message: 'Course withdrawed successfully'
    }
}


export const StudentSemesterRegistrationCourseService = {   
    enrollIntoCourse,
    withdrawCourse
}