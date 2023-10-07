import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { roomFilterableFields } from "./room.constant";
import { RoomService } from "./room.service";



const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

    const result = await RoomService.insertIntoDB(req.body);

    sendResponse(res, {
        success: true,
        data: result,
        message: 'Data inserted successfully',
        statusCode: httpStatus.CREATED

    })

});


const getAll = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, roomFilterableFields);
    const options = pick(req.query, paginationFields);

    const { data, meta } = await RoomService.getAll(filters, options);

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

    const result = await RoomService.getById(id);

    sendResponse(res, {
        success: true,
        data: result,
        message: 'Data fetched successfully',
        statusCode: httpStatus.OK
    })

});

const updateById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await RoomService.updateById(id, req.body);

    sendResponse(res, {
        success: true,
        data: result,
        message: 'Data updated successfully',
        statusCode: httpStatus.OK
    })

});

const deleteById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await RoomService.deleteById(id);

    sendResponse(res, {
        success: true,
        data: result,
        message: 'Data deleted successfully',
        statusCode: httpStatus.OK
    })

});



export const RoomController = {
    insertIntoDB,
    getAll,
    getById,
    updateById,
    deleteById,
}