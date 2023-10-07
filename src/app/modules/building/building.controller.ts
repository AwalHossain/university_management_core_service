import { Request, Response } from 'express';
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { buildingFilterableFields } from "./building.contant";
import { BuildingService } from "./building.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

    const result = await BuildingService.insertIntoDB(req.body);

    sendResponse(res, {
        success: true,
        data: result,
        message: 'Data inserted successfully',
        statusCode: httpStatus.CREATED

    })

});


const getAll = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, buildingFilterableFields);
    const options = pick(req.query, paginationFields);


    const { data, meta } = await BuildingService.getAll(filters, options);

    sendResponse(res, {
        success: true,
        data,
        meta,
        message: 'Data fetched successfully',
        statusCode: httpStatus.OK
    })
});


const getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await BuildingService.getById(id);

    sendResponse(res, {
        success: true,
        data: result,
        message: 'Data fetched successfully',
        statusCode: httpStatus.OK
    })
});


const updateById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await BuildingService.updateById(id, req.body);

    sendResponse(res, {
        success: true,
        data: result,
        message: 'Data updated successfully',
        statusCode: httpStatus.OK
    })
});


const deleteById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await BuildingService.deleteById(id);

    sendResponse(res, {
        success: true,
        data: result,
        message: 'Data deleted successfully',
        statusCode: httpStatus.OK
    })
});




export const BuildingController = {
    insertIntoDB,
    getAll,
    getById,
    updateById,
    deleteById,

}