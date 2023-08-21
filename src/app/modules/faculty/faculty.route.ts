
import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FacultyController } from "./faculty.controller";
import { FacultyValidator } from "./faculty.validation";


const router = Router();



router.post('/', 
validateRequest(FacultyValidator.create),
FacultyController.insertIntoDB);

router.get('/',FacultyController.getAll);
router.get('/:id',
FacultyController.getById);


export const AcademicSemesterRoutes = router;
