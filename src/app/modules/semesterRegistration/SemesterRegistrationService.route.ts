
import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const Router = express.Router();



Router.post('/',
SemesterRegistrationController.insertIntoDB)


export const semesterRegistrationRoute = Router;
