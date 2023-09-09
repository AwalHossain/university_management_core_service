import { ExamType } from "@prisma/client"



export type IUpdateMarkPayload = {
    studentId: string,
     academicSemesterId: string, 
     courseId: string,
     exampType: ExamType,
     marks: number
}