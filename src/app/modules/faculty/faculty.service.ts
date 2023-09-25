/* eslint-disable @typescript-eslint/no-explicit-any */
import { Faculty, Prisma, PrismaClient } from "@prisma/client";
import { FilterOption } from "../../../constants/filterOption";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { facultyRelationalFields, facultyRelationalFieldsMapper, facultySearchableFields } from "./faculty.constant";
import { IFacultyFilterRequest } from "./faculty.interface";



const prisma = new PrismaClient();

const insertIntoDB = async (data: Faculty): Promise<Faculty> => {
    const result = await prisma.faculty.create({
        data,
        include: {
            academicFaculty: true,
            academicDepartment: true,
        },
    })
    return result;
}



const getAll = async (filter: IFacultyFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Faculty[]>> => {

    const { limit, page, skip, } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterOptions } = filter;
    const andCondition = [];
    if (searchTerm) {
        const search = FilterOption.searchFilter(searchTerm, facultySearchableFields);
        andCondition.push(search);
    }

    if (Object.keys(filterOptions).length > 0) {
        const result = FilterOption.objectFilter(filterOptions, facultyRelationalFields, facultyRelationalFieldsMapper)
        andCondition.push(...result);
    }

    const whereCondition: Prisma.FacultyWhereInput = andCondition.length > 0 ? { AND: andCondition } : {};

    const result = await prisma.faculty.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        },
    })

    const total = await prisma.faculty.count({
        where: whereCondition
    })

    return {
        data: result,
        meta: {
            total,
            page,
            limit,
        }
    }
}

const getById = async (id: string): Promise<Faculty | null> => {
    const result = await prisma.faculty.findUnique({
        where: {
            id
        }
    })
    return result;
}



const getMyCourse = async (authUserId: {
    userId: string;
}, filter: {
    academicSemesterId?: string | undefined | null;
    courseId?: string | undefined | null;
}
) => {



    if (!filter.academicSemesterId) {
        const currentSemester = await prisma.academicSemester.findFirst({
            where: {
                isCurrent: true
            }
        })

        filter.academicSemesterId = currentSemester?.id
    }

    const offeredCourseSections = await prisma.offeredCourseSection.findMany({
        where: {
            offeredCourseClassSchedules: {
                some: {
                    faculty: {
                        facultyId: authUserId.userId
                    }
                }
            },
            offeredCourse: {
                semesterRegistration: {
                    academicSemester: {
                        id: filter.academicSemesterId
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
    })

    console.log(offeredCourseSections, 'offeredCourseSections');

    const courseAndClassSchedule = offeredCourseSections.reduce((acc: any, curr: any) => {
        const course = curr.offeredCourse.course;
        const classSchedule = curr.offeredCourseClassSchedules;


        const existingCourse = acc.find((item: any) => item.course.id === course.id);

        if (existingCourse) {
            existingCourse.classSchedule.push(
                {
                    section: curr,
                    classSchedule
                }
            )
        } else {
            acc.push({
                course,
                section: curr,
                classSchedule
            })
        }

        return acc;

    }, [])

    return courseAndClassSchedule;

}



const createFacultyEvent = async (facultyData: any) => {
    // console.log(e, 'faculty');



    try {
        ;
        const result = await insertIntoDB(facultyData as Faculty);
        console.log(result, 'result');

    } catch (err) {
        console.log(err, 'checking');
    }
    // return result;
}


const updateFacultyFromEvent = async (e: any): Promise<void> => {

    const isExist = await prisma.faculty.findUnique({
        where: {
            facultyId: e.id
        }
    })

    if (isExist) {
        await createFacultyEvent(e);
    } else {
        const facultyData: Partial<Faculty> = {
            facultyId: e.id,
            firstName: e.name.firstName,
            lastName: e.name.lastName,
            middleName: e.name.middleName,
            profileImage: e.profileImage,
            email: e.email,
            contactNo: e.contactNo,
            gender: e.gender,
            bloodGroup: e.bloodGroup,
            designation: e.designation,
            academicDepartmentId: e.academicDepartment.syncId,
            academicFacultyId: e.academicFaculty.syncId
        };

        const result = await prisma.faculty.updateMany({
            where: {
                facultyId: e.id
            },
            data: facultyData
        })
        console.log(result, 'result');
    }

}

export const FacultyService = {
    insertIntoDB,
    getAll,
    getById,
    getMyCourse,
    createFacultyEvent,
    updateFacultyFromEvent
}