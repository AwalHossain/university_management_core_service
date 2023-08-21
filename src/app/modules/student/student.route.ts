import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { StudentController } from "./student.controller";
import { StudentValidator } from "./student.validation";


const router = Router();



router.post('/insertIntoDB', 
validateRequest(StudentValidator.create),
StudentController.insertIntoDB);

router.get('/getAll',
StudentController.getAll);
router.get('/:id',
StudentController.getById);


export const AcademicSemesterRoutes = router;
