import { ExamType, PrismaClient } from "@prisma/client";
import { DefaultArgs, PrismaClientOptions } from "@prisma/client/runtime/library";




const createStudentEnrolledCourseDefaultMark =async (
    prismaClient: Omit<PrismaClient<PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">,
    payload: {
        studentId: string;
        studentEnrolledId: string;
        academicSemesterId: string;
    }
)=>{


    const isExistMidterm =await prismaClient.studentEnrolledCourseMark.findFirst({
        where: {
            exampType: ExamType.MIDTERM,
            student: {
                id: payload.studentId
            },
            studentEnrolledCourse: {
                id: payload.studentEnrolledId
            },
            academicSemester:{
                id: payload.academicSemesterId
            }

        }
    })

    if(!isExistMidterm){
        
        await prismaClient.studentEnrolledCourseMark.create({
            data: {
                student:{
                    connect:{
                        id: payload.studentId
                    }
                },
                studentEnrolledCourse:{
                    connect:{
                        id: payload.studentEnrolledId
                    }
                },
                academicSemester:{
                    connect:{
                        id: payload.academicSemesterId
                    }
                },
                exampType: ExamType.MIDTERM,
            }
        })
    }
    const isExistFinal = await prismaClient.studentEnrolledCourseMark.findFirst({
        where: {
            exampType: ExamType.FINAL,
            student: {
                id: payload.studentId
            },
            studentEnrolledCourse: {
                id: payload.studentEnrolledId
            },
            academicSemester:{
                id: payload.academicSemesterId
            }
        }
    })
    if(!isExistFinal){
        await prismaClient.studentEnrolledCourseMark.create({
            data: {
                student:{
                    connect:{
                        id: payload.studentId
                    }
                },
                studentEnrolledCourse:{
                    connect:{
                        id: payload.studentEnrolledId
                    }
                },
                academicSemester:{
                    connect:{
                        id: payload.academicSemesterId
                    }
                },
                exampType: ExamType.FINAL,
            }
        })
    }

    console.log(isExistMidterm, 'isExistMidterm', isExistFinal, 'isExistFinal');
    
}


export const StudentEnrolledCourseMarkService = {
    createStudentEnrolledCourseDefaultMark
}