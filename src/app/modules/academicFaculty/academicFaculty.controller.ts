import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicFacultyFilterableFields } from "./academicFaculty.constant";

const insertIntoDB = catchAsync(async (req:Request, res:Response) => {
    const result = await acdemicFaculty.insertIntoDB(req.body);

    sendResponse(res,{
        success: true,
        data: result,
        message: 'Data inserted successfully',
        statusCode: httpStatus.CREATED

    })

});



const getAll= catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, academicFacultyFilterableFields);
    const options = pick(req.query, paginationFields);

    const result = await acdemicFaculty.getAll(filter, options);

    sendResponse(res,{
        success: true,
        data: result,
        message: 'Data fetched successfully',
        statusCode: httpStatus.OK

    })

});



const getById = catchAsync(async (req: Request, res: Response) => {
        
        const result = await acdemicFaculty.getById(req.params.id);
    
        sendResponse(res,{
            success: true,
            data: result,
            message: 'Data fetched successfully',
            statusCode: httpStatus.OK
        })
    
    });


export const academicDepartmentController = {
    insertIntoDB,  
    getAll,
    getById
}