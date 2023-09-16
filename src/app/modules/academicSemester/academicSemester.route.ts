import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterController } from "./academicSemester.controller";
import { AcademicSemesterValidator } from "./academicSemester.validation";


const router = Router();



router.post('/',
    validateRequest(AcademicSemesterValidator.create),
    AcademicSemesterController.insertIntoDB);

router.get('/',
    AcademicSemesterController.getAll);
router.patch('/:id',
    AcademicSemesterController.updateById);

router.get('/:id',
    AcademicSemesterController.getById);

router.delete('/:id',
    AcademicSemesterController.deleteById);



export const academicSemesterRoutes = router;
