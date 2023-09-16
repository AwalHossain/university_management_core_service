

import { Router } from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyController } from "./academicFaculty.controller";
import { AcademicFacultyValidator } from "./academicFaculty.validation";

const router = Router();


router.post('/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(AcademicFacultyValidator.create),
    AcademicFacultyController.insertIntoDB
)

router.get('/',
    AcademicFacultyController.getAll
);
router.get('/:id',
    AcademicFacultyController.getById
);

router.patch('/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(AcademicFacultyValidator.update),
    AcademicFacultyController.updateById
);


router.delete('/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    AcademicFacultyController.deleteById,
);


export const academicFacultyRoutes = router;