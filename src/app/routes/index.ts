// Import express
import express from 'express';
// Import the academicDepartmentRoutes
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
// Import the academicFacultyRoutes
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';

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
  }
];

// Use the module routes
moduleRoutes.forEach(route => router.use(route.path, route.routes));

// Export the router
export default router;
