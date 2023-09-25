import { Router } from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CourseController } from "./course.controller";
import { CourseValidation } from "./course.validation";



const router = Router();



router.post('/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(CourseValidation.create),
    CourseController.insertIntoDB)

router.get('/', CourseController.getAll)
router.get('/:id', CourseController.getById)
router.patch('/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(CourseValidation.update),
    CourseController.updateById)
router.delete('/:id', CourseController.deleteById)

router.post('/:id/assign-faculty',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(CourseValidation.assignOrRemoveFaculties),
    CourseController.assignFaculty)

router.post('/:id/remove-faculty',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(CourseValidation.assignOrRemoveFaculties),
    CourseController.removeFaculty)



export const courseRoute = router;