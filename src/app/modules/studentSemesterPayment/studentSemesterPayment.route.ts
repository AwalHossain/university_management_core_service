import { Router } from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { StudentSemesterPaymentController } from "./studentSemesterPayment.controller";


const router = Router();

router.get(
    '/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
    StudentSemesterPaymentController.getAll
);

router.get('/get')