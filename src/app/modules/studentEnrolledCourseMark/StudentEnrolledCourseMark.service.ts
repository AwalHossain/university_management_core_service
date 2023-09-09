import { ExamType, PrismaClient, StudentEnrolledCourseStatus } from "@prisma/client";
import { DefaultArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { IUpdateMarkPayload } from "./StudentEnrolledCoursetMark.interface";
import { StudentEnrolledCourseMarkUtils } from "./StudentEnrolledCoursetMark.utils";



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



const updateStudentEnrolledCoursetMark = async (payload:IUpdateMarkPayload)=>{
    const {studentId, academicSemesterId,courseId, exampType, marks} = payload
    const isExist = await prisma.studentEnrolledCourseMark.findFirst({
        where: {
            exampType,
            student: {
                id: studentId
            },
            academicSemester:{
                id: academicSemesterId
            },
            studentEnrolledCourse:{
                course:{
                    id: courseId
                }
            }
        }
    })
    if(!isExist){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Student enrolled course marke not found')
    }

   const result = StudentEnrolledCourseMarkUtils.getGrade(marks)
    
    const update =  await prisma.studentEnrolledCourseMark.update({
        where:{
            id: isExist?.id
        },
        data:{
            marks,
            grade: result.grade,
        }
    })
    
    return update
}


const updateFinalMarks = async (payload:Partial<IUpdateMarkPayload>)=>{
    const {studentId, academicSemesterId,courseId,} = payload



    const isExist = await prisma.studenEnrolledCourse.findFirst({
        where: {

            student: {
                id: studentId
            },
            academicSemester:{
                id: academicSemesterId
            },
            course:{
                id: courseId
            }
        }
    })
    if(!isExist){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Student enrolled course marke not found')
    }
    
    const studentEnrolledCourseMarks =  await prisma.studentEnrolledCourseMark.findMany({
        where:{
            student: {
                id: studentId
            },
            academicSemester:{
                id: academicSemesterId
            },
            studentEnrolledCourse:{
                course:{
                    id: courseId
                }
            }
        }
    })

    if(studentEnrolledCourseMarks.length === 0){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Student enrolled course marke not found')
    }

    const midtermMarks = studentEnrolledCourseMarks.find((item)=>item.exampType === ExamType.MIDTERM)?.marks || 0
    const finalMarks = studentEnrolledCourseMarks.find((item)=>item.exampType === ExamType.FINAL)?.marks || 0
    
    const totalMarks = Math.ceil(midtermMarks * 0.4) + Math.ceil(finalMarks * 0.6);
    console.log(totalMarks, 'result');

    const result = StudentEnrolledCourseMarkUtils.getGrade(totalMarks)


    

   await prisma.studenEnrolledCourse.updateMany({
        where:{
            id: isExist?.id
        },
        data:{
            totalMarks,
            grade: result.grade,
            status: StudentEnrolledCourseStatus.COMPLETED,
            point: result.point

        }
    })

    const grades = await prisma.studenEnrolledCourse.findMany({
        where:{
            student: {
                id: studentId
            },
            status: StudentEnrolledCourseStatus.COMPLETED
        },
        include:{
            course: true
        }
    })

    const academicResult  = StudentEnrolledCourseMarkUtils.calcCGPA(grades)


    const studentAcademicInfo = await prisma.academicInfo.findFirst({
        where: {
            student: {
                id: studentId
            }
        }
    })

    if (studentAcademicInfo) {
        await prisma.academicInfo.update({
            where: {
                id: studentAcademicInfo.id
            },
            data: {
                cgpa: academicResult.cgpa,
                totalCompletedCredit: academicResult.totalCompletedCredit
            }
        })
    } else {
        await prisma.academicInfo.create({
            data: {
                student: {
                    connect: {
                        id: studentId
                    }
                },
                cgpa: academicResult.cgpa,
                totalCompletedCredit: academicResult.totalCompletedCredit
            }
        })
    }



    
    return grades;
}


export const StudentEnrolledCourseMarkService = {
    createStudentEnrolledCourseDefaultMark,
    updateStudentEnrolledCoursetMark,
    updateFinalMarks
}