
import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();


router.get('/get-my-registration',

    auth(ENUM_USER_ROLE.STUDENT),
    SemesterRegistrationController.getMyRegistration
)

router.get('/semester-reg-course',

    auth(ENUM_USER_ROLE.STUDENT),
    SemesterRegistrationController.getMySemesterRegCourse
)

router.post('/',
    validateRequest(SemesterRegistrationValidation.create),
    SemesterRegistrationController.insertIntoDB)

router.get('/',
    SemesterRegistrationController.getAll)

router.get('/:id',
    SemesterRegistrationController.getById)

router.patch('/:id',
    validateRequest(SemesterRegistrationValidation.update),
    SemesterRegistrationController.updateById)

router.delete('/:id',
    SemesterRegistrationController.deleteById)

router.post(
    '/start-my-registration',
    auth(ENUM_USER_ROLE.STUDENT),
    SemesterRegistrationController.startMyRegistraion
)

router.post(
    '/enroll-course',
    auth(ENUM_USER_ROLE.STUDENT),
    validateRequest(SemesterRegistrationValidation.enrollOrWithdrawCourse),
    SemesterRegistrationController.enrollCourse
)

router.post(
    '/withdraw-course',
    auth(ENUM_USER_ROLE.STUDENT),
    validateRequest(SemesterRegistrationValidation.enrollOrWithdrawCourse),
    SemesterRegistrationController.withdrawCourse
)

router.post('/confirm-my-registration',

    auth(ENUM_USER_ROLE.STUDENT),
    SemesterRegistrationController.confirmMyRegistration
)

router.post(
    '/:id/start-new-semester',
    SemesterRegistrationController.startNewSemester
)





export const semesterRegistrationRoute = router;
