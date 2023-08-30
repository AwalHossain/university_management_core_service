
import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';

const Router = express.Router();



Router.post('/',
validateRequest(SemesterRegistrationValidation.create),
SemesterRegistrationController.insertIntoDB)

Router.get('/',
SemesterRegistrationController.getAll)

Router.get('/:id',
SemesterRegistrationController.getById)

Router.patch('/:id',
validateRequest(SemesterRegistrationValidation.update),
SemesterRegistrationController.updateById)

Router.delete('/:id',
SemesterRegistrationController.deleteById)

Router.post(
    '/start-my-registration',
    auth(ENUM_USER_ROLE.STUDENT),
    SemesterRegistrationController.startMyRegistraion
)



export const semesterRegistrationRoute = Router;
