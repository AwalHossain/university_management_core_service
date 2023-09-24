
import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './building.controller';
import { BuildingValidation } from './building.validation';


const router = express.Router();

router.post(
    '/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(BuildingValidation.create),
    BuildingController.insertIntoDB
)

router.get(
    '/',
    BuildingController.getAll
)

router.get(
    '/:id',
    BuildingController.getById
)

router.patch(
    '/:id',
    validateRequest(BuildingValidation.update),
    BuildingController.updateById

)

router.delete(
    '/:id',
    BuildingController.deleteById
)

export const buildingRoutes = router;