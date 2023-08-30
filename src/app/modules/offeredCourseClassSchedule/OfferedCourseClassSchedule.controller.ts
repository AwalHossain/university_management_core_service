import { OfferedCourseClassSchedule } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";

import catchAsync from "../../../shared/catchAsync";
import { OfferedCourseClassScheduleService } from "./OfferedCourseClassSchedule.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const data = req.body as OfferedCourseClassSchedule;
    const result = await OfferedCourseClassScheduleService.insertIntoDb(data);
    
    sendResponse(
        res,{
            statusCode: httpStatus.CREATED,
            success: true,
            data: result,
            message: "Class schedule created successfully"
        }
    )
}
)

export const OfferedCourseClassScheduleController = {
    insertIntoDB
}