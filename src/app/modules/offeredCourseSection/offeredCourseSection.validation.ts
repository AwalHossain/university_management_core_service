import { z } from "zod";

const create = z.object({
    body: z.object({
        offeredCourseId: z.string().nonempty({
            message: "Offered course id is required",
          }),
          title: z.string().nonempty({
            message: "Title is required",
          }),
          maxCapacity: z.number().int().positive({
            message: "Max capacity must be a positive integer",
          }),
          currentlyEnrolledStudent: z.number().int().positive({
            message: "Currently enrolled student must be a positive integer",
          }),
            semesterRegistrationId: z.string().nonempty({
                message: "Semester registration id is required",
                }),
    })
});

const update = z.object({
    body: z.object({
        academicDepartmentId: z.string().optional(),
        semesterRegistrationId: z.string().optional(),
        currentlyEnrolledStudent: z.number().optional(),
        maxCapacity: z.number().optional(),
        courseId: z.string().optional(),
    })
})


export const OfferedCourseSectionValidator = {
    create,
    update
};