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
router.put('/:id',
validateRequest(CourseValidation.update),
CourseController.updateById)
router.delete('/:id', CourseController.deleteById)


export const courseRoute = router;