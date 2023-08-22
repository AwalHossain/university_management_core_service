
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './building.controller';
import { BuildingValidation } from './building.validation';


const router = express.Router();

router.post(
    '/',
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