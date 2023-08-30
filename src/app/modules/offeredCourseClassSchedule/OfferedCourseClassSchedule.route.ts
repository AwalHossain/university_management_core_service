

import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OfferedCourseClassScheduleController } from "./OfferedCourseClassSchedule.controller";
import { OfferedCourseClassScheduleValidation } from "./OfferedCourseClassSchedule.validation";

const router = express.Router();


router.post("/", 
validateRequest(OfferedCourseClassScheduleValidation.create),
OfferedCourseClassScheduleController.insertIntoDB);


export const OfferedCourseClassScheduleRoute = router;