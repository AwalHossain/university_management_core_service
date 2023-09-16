
import { Router } from "express";
import { academicDepartmentController } from "./academicDepartment.controller";

const router = Router();



router.get('/',
    academicDepartmentController.getAll
);

router.get('/:id',
    academicDepartmentController.getById
);


router.post('/',
    academicDepartmentController.insertIntoDB
)

router.patch('/:id',
    academicDepartmentController.updateById
)


router.delete('/:id',
    academicDepartmentController.deleteById
)


export const academicDepartmentRoutes = router;