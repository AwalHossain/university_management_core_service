import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { offeredCourseSectionFilterableFields } from "./offeredCourseSection.constant";
import { OfferedCourseSectionService } from "./offeredCourseSection.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "OfferedCourseSection inserted successfully",
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const filterData = pick(req.query, offeredCourseSectionFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await OfferedCourseSectionService.getAll(filterData, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OfferedCourseSections retrieved successfully",
    data: result,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OfferedCourseSectionService.getById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OfferedCourseSection retrieved successfully",
    data: result,
  });
});

const updateById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OfferedCourseSectionService.updateById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OfferedCourseSection updated successfully",
    data: result,
  });
});

const deleteById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OfferedCourseSectionService.deleteById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OfferedCourseSection deleted successfully",
    data: result,
  });
});

export const OfferedCourseSectionController = {
  insertIntoDB,
  getAll,
  getById,
  updateById,
  deleteById,
};