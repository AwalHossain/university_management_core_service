import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";


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
    const filter = pick(req.query, academicDepartmentFilterableFields);
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