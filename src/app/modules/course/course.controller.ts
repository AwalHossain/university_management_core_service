import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CourseService } from "./course.service";


const insertIntoDB = catchAsync(async(req: Request, res: Response) => {

    const result = await CourseService.insertIntoDB(req.body);

    sendResponse(res,{
        statusCode: httpStatus.CREATED,
        success: true,
        data: result,
        message: "Course created successfully"

    })
})






export const CourseController = {
    insertIntoDB
}