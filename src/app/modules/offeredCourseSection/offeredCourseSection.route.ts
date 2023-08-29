import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OfferedCourseSectionController } from "./offeredCourseSection.controller";
import { OfferedCourseSectionValidator } from "./offeredCourseSection.validation";

const router = express.Router();


router.post("/",
validateRequest(OfferedCourseSectionValidator.create),
OfferedCourseSectionController.insertIntoDB
)


router.get("/",
OfferedCourseSectionController.getAll
)

router.get("/:id",
OfferedCourseSectionController.getById
)

router.patch("/:id",
validateRequest(OfferedCourseSectionValidator.update),
OfferedCourseSectionController.updateById
)


router.delete("/:id",
OfferedCourseSectionController.deleteById
)

export const offeredCourseSectionRoute = router;