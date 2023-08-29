import { OfferedCourse, PrismaClient } from "@prisma/client";
import { asyncForEach } from "../../../shared/utils";
import { ICreateOfferCourse } from "./offeredCourse.interface";

const prisma = new PrismaClient();

const insertIntoDB  = (
    data: ICreateOfferCourse
)=> {
        const { courseIds, academicDepartmentId, semesterRegistrationId } = data;   
        const offeredCourses: OfferedCourse[] = [];
        asyncForEach(courseIds, async (courseId) => {
            const existingOfferedCourse = await prisma.offeredCourse.findFirst({
                where: {
                    courseId,
                    academicDepartmentId,
                    semesterRegistrationId
                }

            });

            if (!existingOfferedCourse) {
          const insertedCourse =  await prisma.offeredCourse.create({
                    data: {
                        courseId,
                        academicDepartmentId,
                        semesterRegistrationId
                    },
                    include: {
                        course: true,
                        academicDepartment: true,
                        semesterRegistration: true
                    }
                });
                offeredCourses.push(insertedCourse);
            }


        });

        return offeredCourses;
}









export const OfferedCourseService = {
    insertIntoDB
}
