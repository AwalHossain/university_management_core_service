import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicFacultyFilterableFields } from "./academicFaculty.constant";
import { AcademicFacultyService } from "./academicFaculty.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.insertIntoDB(req.body);

    sendResponse(res, {
        success: true,
        data: result,
        message: 'Data inserted successfully',
        statusCode: httpStatus.CREATED

    })

});



const getAll = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, academicFacultyFilterableFields);
    const options = pick(req.query, paginationFields);

    const { data, meta } = await AcademicFacultyService.getAll(filter, options);
    sendResponse(res, {
        success: true,
        data,
        meta,
        message: 'Data fetched successfully',
        statusCode: httpStatus.OK

    })

});



const getById = catchAsync(async (req: Request, res: Response) => {

    const result = await AcademicFacultyService.getById(req.params.id);

    sendResponse(res, {
        success: true,
        data: result,
        message: 'Data fetched successfully',
        statusCode: httpStatus.OK
    })

});


const updateById = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.updateById(req.params.id, req.body);

    sendResponse(res, {
        success: true,
        data: result,
        message: 'Data updated successfully',
        statusCode: httpStatus.OK
    })

});

const deleteById = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.deleteById(req.params.id);

    sendResponse(res, {
        success: true,
        data: result,
        message: 'Data deleted successfully',
        statusCode: httpStatus.OK
    })

});




export const AcademicFacultyController = {
    insertIntoDB,
    getAll,
    getById,
    updateById,
    deleteById,
}