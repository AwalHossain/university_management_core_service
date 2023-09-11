import { Router } from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { StudentController } from "./student.controller";
import { StudentValidator } from "./student.validation";


const router = Router();



router.post('/',
    validateRequest(StudentValidator.create),
    StudentController.insertIntoDB);


router.get('/',
    StudentController.getAll);
router.get('/my-courses',
    auth(ENUM_USER_ROLE.STUDENT),
    StudentController.MyCourse);

router.get('/my-course-schedules',
    auth(ENUM_USER_ROLE.STUDENT),
    StudentController.getMyCourseSchedules);

router.get('/my-academic-info',
    auth(ENUM_USER_ROLE.STUDENT),
    StudentController.getMyAcademicInfo);

router.get('/:id',
    StudentController.getById);



export const studentRoutes = router;
