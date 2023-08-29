import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseValidator } from './offeredCourse.validation';

const router = express.Router();



router.post('/',
validateRequest(OfferedCourseValidator.create),
OfferedCourseController.insertIntoDB)

router.get('/',
OfferedCourseController.getAll)

router.get('/:id',
OfferedCourseController.getById)

router.patch('/:id',
validateRequest(OfferedCourseValidator.update),
OfferedCourseController.updateById)

router.delete('/:id',
OfferedCourseController.deleteById)



export const offeredCourseRoute = router;