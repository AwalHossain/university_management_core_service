import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseController } from "./course.controller";
import { CourseValidation } from "./course.validation";



const router = Router();



router.post('/', 
validateRequest(CourseValidation.create),
CourseController.insertIntoDB)

router.get('/', CourseController.getAll)
router.get('/:id', CourseController.getById)
router.patch('/:id',
validateRequest(CourseValidation.update),
CourseController.updateById)
router.delete('/:id', CourseController.deleteById)

router.post('/:id/assign-faculty',
validateRequest(CourseValidation.assignOrRemoveFaculties),
CourseController.assignFaculty)

router.post('/:id/remove-faculty',
validateRequest(CourseValidation.assignOrRemoveFaculties),
CourseController.removeFaculty)



export const courseRoute = router;