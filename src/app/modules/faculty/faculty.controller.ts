import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { facultyFilterableFields } from "./faculty.constant";
import { FacultyService } from "./faculty.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await FacultyService.insertIntoDB(req.body);

    sendResponse(res, {
        success: true,
        data: result,
        message: 'Data inserted successfully',
        statusCode: httpStatus.CREATED

    })

});


const getAll = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, facultyFilterableFields);
    const options = pick(req.query, paginationFields);

    const { data, meta } = await FacultyService.getAll(filter, options);

    sendResponse(res, {
        success: true,
        data,
        meta,
        message: 'Data fetched successfully',
        statusCode: httpStatus.OK

    })

});


const getById = catchAsync(async (req: Request, res: Response) => {

    const result = await FacultyService.getById(req.params.id);

    sendResponse(res, {
        success: true,
        data: result,
        message: 'Data fetched successfully',
        statusCode: httpStatus.OK
    })

});


const getMyCourse = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const filter = pick(req.query, ['academicSemesterId', 'courseId']);

    const result = await FacultyService.getMyCourse(user?.userId, filter);

    sendResponse(res, {
        success: true,
        data: result,
        message: 'fauclty data fetched successfully',
        statusCode: httpStatus.OK
    })

});


export const FacultyController = {
    insertIntoDB,
    getAll,
    getById,
    getMyCourse
}