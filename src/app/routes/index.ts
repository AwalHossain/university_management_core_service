// Import express
import express from 'express';
// Import the academicDepartmentRoutes
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
// Import the academicFacultyRoutes
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { buildingRoutes } from '../modules/building/building.route';
import { courseRoute } from '../modules/course/course.route';
import { facultyRoutes } from '../modules/faculty/faculty.route';
import { offeredCourseRoute } from '../modules/offeredCourse/offeredCourse.route';
import { OfferedCourseClassScheduleRoute } from '../modules/offeredCourseClassSchedule/OfferedCourseClassSchedule.route';
import { offeredCourseSectionRoute } from '../modules/offeredCourseSection/offeredCourseSection.route';
import { roomRoutes } from '../modules/room/room.route';
import { semesterRegistrationRoute } from '../modules/semesterRegistration/SemesterRegistrationService.route';
import { studentRoutes } from '../modules/student/student.route';
import { StudentEnrolledCourseMarkRoute } from '../modules/studentEnrolledCourseMark/StudentEnrolledCoursetMark.route';

// Create a new router
const router = express.Router();

// Create a new array of the module routes
const moduleRoutes = [
  // ... routes
  {
    // The path for the module
    path: '/academic-departments',
    // The routes for the module
    routes: academicDepartmentRoutes
  },
  {
    // The path for the module
    path: '/academic-faculties',
    // The routes for the module
    routes: academicFacultyRoutes
  },
  {
    path: '/academic-semesters',
    routes: academicSemesterRoutes
  },
  {
    path: '/faculty',
    routes: facultyRoutes
  },
  {
    path: '/student',
    routes: studentRoutes
  },
  {
    path: '/course',
    routes: courseRoute
  },
  {
    path: '/buildings',
    routes: buildingRoutes
  },
  {
    path: '/room',
    routes: roomRoutes
  },
  {
    path: '/semester-registration',
    routes: semesterRegistrationRoute
  },
  {
    path: '/offered-course',
    routes: offeredCourseRoute
  },
  {
    path: '/offered-course-section',
    routes: offeredCourseSectionRoute
  },
  {
    path: '/student-enrolled-course-marks',
    routes: StudentEnrolledCourseMarkRoute
  },
  {
    path: '/offered-course-class-schedule',
    routes: OfferedCourseClassScheduleRoute
  },
];

// Use the module routes
moduleRoutes.forEach(route => router.use(route.path, route.routes));

// Export the router
export default router;
