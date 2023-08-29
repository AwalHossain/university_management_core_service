import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { offeredCourseFilterableFields } from "./offeredCourse.constant";
import { OfferedCourseService } from "./offeredCourse.service";



const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

    const result = await OfferedCourseService.insertIntoDB(req.body);
   
    sendResponse(
        res,{
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'OfferedCourse inserted successfully',
        data: result
    })

})


export const getAll = catchAsync(async (req: Request, res: Response) => {
    const filterData = pick(req.query, offeredCourseFilterableFields)
    const options = pick(req.query, paginationFields)
    const result = await OfferedCourseService.getAll(filterData, options);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OfferedCourses retrieved successfully",
      data: result,
    });
  });


const getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseService.getById(id);
  
   
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "OfferedCourse retrieved successfully",
        data: result,
      });

  });



const updateById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseService.updateById(id, req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OfferedCourse updated successfully",
      data: result,
    });
  });


const deleteById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseService.deleteById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OfferedCourse deleted successfully",
      data: result,
    });
  });



  export const OfferedCourseController = {
    insertIntoDB,
    getAll,
    getById,
    updateById,
    deleteById
    }
