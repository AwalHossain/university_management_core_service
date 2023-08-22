import { PrismaClient } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IcourseCreateData } from "./course.interface";

const prisma = new PrismaClient();

const insertIntoDB = async (data: IcourseCreateData) => {

    const { preRequisiteCourses, ...courseData } = data;

    const newCourse = await prisma.$transaction(async (tx) => {
        const course = await tx.course.create(
            {
                data: courseData
            }
        )

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            for (let i = 0; i < preRequisiteCourses.length; i++) {
                const createPreRequisite = await tx.courseToPrerequisite.create(
                    {
                        data: {
                            courseId: course.id,
                            preRequisiteId: preRequisiteCourses[i].courseId
                        }
                    })
                console.log(createPreRequisite, "createPreRequisite");

            }

        }
        return course;
    })

    if (newCourse) {
        const response = await prisma.course.findUnique({
            where: {
                id: newCourse.id
            },
            include: {
                preRequisite: {
                    include: {
                        prerequisite: true
                    }
                },
                preRequisiteFor: {
                    include: {
                        course: true
                    }
                }

            }
        })
        return response;

    }

    throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create course")
}





export const CourseService = {
    insertIntoDB
}