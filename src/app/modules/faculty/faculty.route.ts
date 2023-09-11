
import { Router } from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { FacultyController } from "./faculty.controller";
import { FacultyValidator } from "./faculty.validation";


const router = Router();

router.get('/my-course',
auth(ENUM_USER_ROLE.FACULTY),
FacultyController.getMyCourse);

router.post('/', 
validateRequest(FacultyValidator.create),
FacultyController.insertIntoDB);

router.get('/',FacultyController.getAll);
router.get('/:id',
FacultyController.getById);





export const facultyRoutes = router;
