

import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyController } from "./academicFaculty.controller";
import { AcademicFacultyValidator } from "./academicFaculty.validation";

const router = Router();


router.post('/',
validateRequest(AcademicFacultyValidator.create),
AcademicFacultyController.insertIntoDB
)

router.get('/',
AcademicFacultyController.getAll
);
router.get('/:id',
AcademicFacultyController.getById
);


export const academicFacultyRoutes = router;