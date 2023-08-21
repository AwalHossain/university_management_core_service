import { Request, Response } from 'express';
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { buildingFilterableFields } from "./building.contant";
import { BuildingService } from "./building.service";


const insertIntoDB = catchAsync(async (req:Request, res:Response) => {

    const result = await BuildingService.insertIntoDB(req.body);

    sendResponse(res,{
        success: true,
        data: result,
        message: 'Data inserted successfully',
        statusCode: httpStatus.CREATED

    })

});


const getAll = catchAsync(async (req:Request, res:Response) => {
    const filters = pick(req.query, buildingFilterableFields);
    const options = pick(req.query, paginationFields);


    const result = await BuildingService.getAll(filters, options);

    sendResponse(res,{
        success: true,
        data: result,
        message: 'Data fetched successfully',
        statusCode: httpStatus.OK
    })
});


export const BuildingController = {
    insertIntoDB,
    getAll
}