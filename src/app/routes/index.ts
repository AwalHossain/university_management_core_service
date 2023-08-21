// Import express
import express from 'express';
// Import the academicDepartmentRoutes
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
// Import the academicFacultyRoutes
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { StudentRoutes } from '../modules/student/student.route';

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
    routes: AcademicSemesterRoutes
  },
  {
    path: '/faculty',
    routes: FacultyRoutes
  },
  {
    path: '/student',
    routes: StudentRoutes
  }
];

// Use the module routes
moduleRoutes.forEach(route => router.use(route.path, route.routes));

// Export the router
export default router;
