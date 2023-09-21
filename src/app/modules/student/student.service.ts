/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient, Student, StudentEnrolledCourseStatus } from "@prisma/client";
import { FilterOption } from "../../../constants/filterOption";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { studentRelationalFields, studentRelationalFieldsMapper, studentSearchableFields } from "./student.constant";
import { IStudentFilterRequest } from "./student.interface";

const prisma = new PrismaClient();


const insertIntoDB = async (data: Student) => {
    const result = await prisma.student.create({
        data,
        include: {
            academicFaculty: true,
            academicSemester: true,
            acdemicDepartment: true,
        }
    });
    return result;
}



const getAll = async (filter: IStudentFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Student[]>> => {

    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filter;

    const andCondition = [];

    if (searchTerm) {
        const search = FilterOption.searchFilter(searchTerm, studentSearchableFields);
        andCondition.push(search);
    }


    if (Object.keys(filterData).length > 0) {
        const result = FilterOption.objectFilter(filterData, studentRelationalFields, studentRelationalFieldsMapper)
        andCondition.push(...result);
    }

    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};

    const result = await prisma.student.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortOrder && options.sortBy ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
    });

    const total = await prisma.student.count({
        where: whereCondition
    });

    return {
        data: result,
        meta: {
            total,
            page,
            limit,
        }
    }


}

const getById = async (id: string) => {
    const result = await prisma.student.findUnique({
        where: {
            id
        }
    });
    return result;
}


const myCourse = async (
    authUserId: string,
    filter: {
        academicSemesterId?: string,
        courseId?: string,
    }
) => {

    if (!filter.academicSemesterId) {
        const currentSemester = await prisma.academicSemester.findFirst({
            where: {
                isCurrent: true
            }
        });

        filter.academicSemesterId = currentSemester?.id;
    }

    console.log(filter, 'filter');


    const result = await prisma.studenEnrolledCourse.findMany({
        where: {
            student: {
                studentId: authUserId
            },
            ...filter

        },
        include: {
            course: true,
        }
    });

    return result;
}


const getMyCourseSchedules = async (
    authUserId: string,
    filter: {
        academicSemesterId?: string,
        courseId?: string,
    }
) => {

    if (!filter.academicSemesterId) {
        const currentSemester = await prisma.academicSemester.findFirst({
            where: {
                isCurrent: true
            }
        });

        filter.academicSemesterId = currentSemester?.id;
    }
    const studenEnrolledCourses = await myCourse(authUserId, filter);
    const studentEnrolledCourseIds = studenEnrolledCourses.map((course) => course.courseId);
    console.log(studentEnrolledCourseIds, 'studentEnrolledCourseIds');



    const result = await prisma.studentSemesterRegistrationCourse.findMany({
        where: {
            student: {
                studentId: authUserId
            },
            semesterRegistration: {
                academicSemester: {
                    id: filter.academicSemesterId
                }
            },
            offeredCourse: {
                course: {
                    id: {
                        in: studentEnrolledCourseIds
                    }
                }
            }
        },
        include: {
            offeredCourse: {
                include: {
                    course: true
                }
            },
            offeredCourseSection: {
                include: {
                    offeredCourseClassSchedules: {
                        include: {
                            room: {
                                include: {
                                    building: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    console.log(result, 'result');


    return result;


}



const getMyAcademicInfo = async (authUserId: string) => {

    const academicInfo = await prisma.academicInfo.findFirst({
        where: {
            student: {
                studentId: authUserId
            }
        }
    })

    const enrolledCourses = await prisma.studenEnrolledCourse.findMany({
        where: {
            student: {
                studentId: authUserId
            },
            status: StudentEnrolledCourseStatus.COMPLETED,

        },
        include: {
            course: true,
            academicSemester: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    return enrolledCourses;
}


const createStudentEvent = async (e: any) => {

    const studentData: Partial<Student> = {
        studentId: e.id,
        firstName: e.name.firstName,
        lastName: e.name.lastName,
        middleName: e.name.middleName,
        email: e.email,
        contactNo: e.contactNo,
        gender: e.gender,
        bloodGroup: e.bloodGroup,
        academicSemesterId: e.academicSemester.syncId,
        academicDepartmentId: e.academicDepartment.syncId,
        academicFacultyId: e.academicFaculty.syncId,
        profileImage: e.profileImage,
    };

    console.log(studentData, 'studentData');



    const result = await insertIntoDB(studentData as Student);
    console.log(result, 'result');

    // return result;
}


export const StudentService = {
    insertIntoDB,
    getAll,
    getById,
    myCourse,
    getMyCourseSchedules,
    getMyAcademicInfo,
    createStudentEvent
}