import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { courseFilterableFields } from "./course.constant";
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


const getAll = catchAsync(async(req: Request, res: Response) => {

    const filter = pick(req.query, courseFilterableFields);
    const options = pick(req.query,paginationFields );

    const result = await CourseService.getAll(filter,options);

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Courses fetched successfully"
    }
    )
})

const getById = catchAsync(async(req: Request, res: Response) => {

    const result = await CourseService.getById(req.params.id);

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Course fetched successfully"
    }
    )
})


const updateById = catchAsync(async(req: Request, res: Response) => {

    const result = await CourseService.updateById(req.params.id, req.body);

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Course updated successfully"
    }
    )
})


const deleteById = catchAsync(async(req: Request, res: Response) => {

    const result = await CourseService.deleteById(req.params.id);

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Course deleted successfully"
    }
    )

})

export const CourseController = {
    insertIntoDB,
    getAll,
    getById,
    updateById,
    deleteById
}