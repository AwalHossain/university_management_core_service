
import express from 'express';
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

Router.put('/:id',
validateRequest(SemesterRegistrationValidation.update),
SemesterRegistrationController.updateById)

Router.delete('/:id',
SemesterRegistrationController.deleteById)



export const semesterRegistrationRoute = Router;
