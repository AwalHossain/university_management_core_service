import { PrismaClient, SemesterRegistration, SemesterRegistrationStatus, StudentSemesterRegistration } from "@prisma/client";
import httpStatus from "http-status";
import { FilterOption } from "../../../constants/filterOption";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { SemesterRegistrationRelationalFields, SemesterRegistrationRelationalFieldsMapper, semesterRegistrationSearchableFields } from "./semesterRegistration.contant";
import { IEnrollCousePayload, ISemesterRegRequest } from "./semesterRegistration.interface";


const prisma = new PrismaClient();



const insertIntoDB = async (data: SemesterRegistration) => {

    const isAnySemesterRegUpcomingOrOngoing = await prisma.semesterRegistration.findFirst({
        where: {
            OR: [
                {
                    status: SemesterRegistrationStatus.UPCOMING
                },
                {
                    status: SemesterRegistrationStatus.ONGOING
                }
            ]
        }
    })

    if (isAnySemesterRegUpcomingOrOngoing) {
        throw new ApiError(httpStatus.BAD_REQUEST, `There is already an ${isAnySemesterRegUpcomingOrOngoing.status}  semester registration`)
    }

    return await prisma.semesterRegistration.create({
        data: {
            ...data
        }
    })
}


const getAll = async (
    filters: ISemesterRegRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<SemesterRegistration[]>> => {

    const {searchTerm, ...filterOptions} = filters;
    const {limit, skip, page, } = paginationHelpers.calculatePagination(options)
    console.log(filters, filterOptions,'searchTerm, filterData');
    
    const andConditions = [];

    if (searchTerm) {
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        andConditions.push({
            OR: semesterRegistrationSearchableFields.map((field) => ({
                [field]:{
                    in: Object.values(SemesterRegistrationStatus).filter(
                      (enumValue) => enumValue.toLowerCase().includes(lowercaseSearchTerm)
                    )
                  }
            }))
        });
    }
  
    if (Object.keys(filterOptions).length > 0) {
    const result =   FilterOption.objectFilter(filterOptions, SemesterRegistrationRelationalFields, SemesterRegistrationRelationalFieldsMapper)
    andConditions.push(...result)
    }
  
    const whereCondition = andConditions.length>0?{ AND: andConditions }:{};
  
    const result = await prisma.semesterRegistration.findMany({
        where: whereCondition,
        skip,
        take : limit,
        orderBy: options.sortOrder && options.sortBy ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
    });
  
    const count = await prisma.semesterRegistration.count({
      where: whereCondition,
    });
  
    return {
      data: result,
      meta: {
        total: count,
        page,
        limit,
      },
    };

}

const getById = async (id: string) => {
     
    const result = await prisma.semesterRegistration.findUnique({
        where: {
            id
        },
        include: {
            academicSemester: true
        }
        
    })

    return result;
}

const updateById = async (id: string, data: SemesterRegistration) => {

    const isExist = await prisma.semesterRegistration.findUnique({
        where: {
            id
        }
    })

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Semester registration not found')
    }

    if(isExist.status === SemesterRegistrationStatus.UPCOMING && data.status !== SemesterRegistrationStatus.ONGOING) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Semester registration status can only be changed to ongoing')
    }

    if(isExist.status === SemesterRegistrationStatus.ONGOING && data.status !== SemesterRegistrationStatus.ENDED) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Semester registration status can only be changed to ended')
    }

    const result = await prisma.semesterRegistration.update({
        where: {
            id
        },
        data: {
            ...data
        }
    })

    return result;
}


const deleteById = async (id: string) => {
    const result = await prisma.semesterRegistration.delete({
        where: {
            id
        }
    })

    return result;
}


const startMyRegistraion = async (authUserId: string):Promise<{
    semesterRegistration: SemesterRegistration | null,
    studentSemesterRegistration: StudentSemesterRegistration | null
}> => {
    const studentInfo  = await prisma.student.findFirst({
        where:{
            studentId: authUserId
        }
    })

    if(!studentInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
    }

    const semesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
        where: {
            OR:[
                {
                    status: SemesterRegistrationStatus.UPCOMING
                },
                {
                    status: SemesterRegistrationStatus.ONGOING
                }
            ]
        }
    })

    /**
     * or you could use $In
     *  where{
     *  status: {
     * in: [SemesterRegistrationStatus.UPCOMING, SemesterRegistrationStatus.ONGOING]
     * }
     * }
     */

    if(semesterRegistrationInfo?.status === SemesterRegistrationStatus.UPCOMING) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Semester registration is not started yet')
    }


    let studentRegistration = await prisma.studentSemesterRegistration.findFirst({
        where: {
            student: {
                id: studentInfo?.id
            },
            semesterRegistration: {
                id: semesterRegistrationInfo?.id
            }
        }
    })

    if(!studentRegistration) {
        studentRegistration = await prisma.studentSemesterRegistration.create({
            data: {
                student: {
                    connect: {
                        id: studentInfo?.id
                    }
                },
                semesterRegistration: {
                    connect: {
                        id: semesterRegistrationInfo?.id
                    }
                }
            }
        })
    }

    return {
        semesterRegistration: semesterRegistrationInfo,
        studentSemesterRegistration: studentRegistration
    }
}


const enrollToCourse = async (authUserId: string, payload: IEnrollCousePayload) => {

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
            await tx.studentSemesterRegistrationCourse.create({
                data:{
                    studentId: studentInfo?.id,
                    semesterRegistrationId: semesterRegistrationInfo?.id,
                    courseSectionId: payload.offeredCourseSectionId,
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


const confirmMyRegistration = async (authUserId: string) => {



    const semesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
        where: {
            status: SemesterRegistrationStatus.ONGOING
        },
    })

   const studentSemesterRegistrationInfo = await prisma.studentSemesterRegistration.findFirst({
        where: {
            student: {
                studentId: authUserId
            },
            semesterRegistration: {
                id: semesterRegistrationInfo?.id
            }

        },

    })

    if(!studentSemesterRegistrationInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Student semester registration not found')
    }

    if(studentSemesterRegistrationInfo?.totalCredit && semesterRegistrationInfo?.maxCredit  && semesterRegistrationInfo?.minCredit
        && studentSemesterRegistrationInfo?.totalCredit < semesterRegistrationInfo?.minCredit && studentSemesterRegistrationInfo?.totalCredit > semesterRegistrationInfo?.maxCredit) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Total credit is not in range')
        }


        await prisma.studentSemesterRegistration.update({
            where: {
                id: studentSemesterRegistrationInfo?.id
            },
            data: {
                isConfirmed: true
            }
        })

        return {
            message: 'Registration confirmed successfully'
        }
}





export const SemesterRegistrationService = {
    insertIntoDB,
    getAll,
    getById,
    updateById,
    deleteById,
    startMyRegistraion,
    enrollToCourse,
    withdrawCourse,
    confirmMyRegistration
}
