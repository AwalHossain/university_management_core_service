import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RoomController } from './room.controller';
import { RoomValidation } from './room.validation';

const router = express.Router();

router.post(
    '/',
    validateRequest(RoomValidation.create),
    RoomController.insertIntoDB
)

router.get(
    '/',
    RoomController.getAll
)

router.get(
    '/:id',
    RoomController.getById
)

router.patch(
    '/:id',
    validateRequest(RoomValidation.update),
    RoomController.updateById
)

router.delete(
    '/:id',
    RoomController.deleteById
)



export const roomRoutes = router;