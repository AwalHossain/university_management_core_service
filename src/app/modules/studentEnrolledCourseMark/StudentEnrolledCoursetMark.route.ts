
import { Router } from 'express';
import { StudentEnrolledCourseMarkController } from './StudentEnrolledCourseMark.controller';


const router = Router();


// router.patch('/', 
//     // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
//     StudentEnrolledCourseMarkController.updateStudentEnrolledCoursetMark
// )


router.patch('/update-marks', StudentEnrolledCourseMarkController.updateStudentEnrolledCoursetMark)
router.patch('/update-final-marks', StudentEnrolledCourseMarkController.updateFinalMarks)



export const StudentEnrolledCourseMarkRoute = router;

