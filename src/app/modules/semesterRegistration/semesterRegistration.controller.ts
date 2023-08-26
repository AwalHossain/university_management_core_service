import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { SemesterRegistrationFilterableFields } from "./semesterRegistration.contant";
import { SemesterRegistrationService } from "./semesterRegistration.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

    const result = await SemesterRegistrationService.insertIntoDB(req.body)

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Semester registration created successfully",
        data: result
    })


})

const getAll = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, SemesterRegistrationFilterableFields);
    const options = pick(req.query, paginationFields);

    const result = await SemesterRegistrationService.getAll(filters, options);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Semester registration fetched successfully",
        data: result
    })

})


const getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await SemesterRegistrationService.getById(id);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Semester registration fetched successfully",
        data: result
    })


})


const updateById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SemesterRegistrationService.updateById(id, req.body);

    sendResponse(
        res, {
        success: true,

        statusCode: httpStatus.OK,
        message: "Semester registration updated successfully",
        data: result
    })

})

const deleteById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await SemesterRegistrationService.deleteById(id);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Semester registration deleted successfully",

        data: result
    })

}
)




export const SemesterRegistrationController = {
    insertIntoDB,
    getAll,
    getById,
    updateById,
    deleteById,
}