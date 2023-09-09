import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StudentEnrolledCourseMarkService } from "./StudentEnrolledCourseMark.service";


const updateStudentEnrolledCoursetMark = catchAsync(async (req: Request, res: Response) => {

    const result = await StudentEnrolledCourseMarkService.updateStudentEnrolledCoursetMark(req.body);

    sendResponse(res,{
        success: true,
        data: result,
        message: 'Data updated successfully',
        statusCode: httpStatus.OK,
    })


})
const updateFinalMarks = catchAsync(async (req: Request, res: Response) => {

    const result = await StudentEnrolledCourseMarkService.updateFinalMarks(req.body);

    sendResponse(res,{
        success: true,
        data: result,
        message: 'Data updated successfully',
        statusCode: httpStatus.OK,
    })
})



export const StudentEnrolledCourseMarkController = {
    updateStudentEnrolledCoursetMark,
    updateFinalMarks
}