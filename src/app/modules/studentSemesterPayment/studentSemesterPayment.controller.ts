import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { studentSemesterPaymentFilterableFields } from "./studentSemesterPayment.constant";
import { StudentSemesterPaymentService } from "./studentSemesterPayment.service";



const getAll = catchAsync(async (req: Request, res: Response) => {

    const filter = pick(req.query, studentSemesterPaymentFilterableFields)
    const options = pick(req.query, paginationFields)
    const { data, meta } = await StudentSemesterPaymentService.getAll(filter, options);

    sendResponse(res, {
        success: true,
        data,
        meta,
        message: 'Data fetched successfully',
        statusCode: httpStatus.OK
    })

}
)


export const StudentSemesterPaymentController = {
    getAll
}