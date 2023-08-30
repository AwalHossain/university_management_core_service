import { z } from "zod";


const create = z.object({
    body: z.object({
        dayOfWeek: z.string({
            required_error: "Day of week is required"
        }),
        startTime: z.string({
            required_error: "Start time is required"
        }),
        endTime: z.string({

            required_error: "End time is required"
        }),
        facultyId: z.number({
            required_error: "Faculty id is required"
        }),
        roomId: z.number({
            required_error: "Room id is required"
        }),
        offeredCourseSectionId: z.number({
            required_error: "Offered course section id is required"
        }),
        semesterRegistrationId: z.number({
            required_error: "Semester registration id is required"
        })
    })
})


export const OfferedCourseClassScheduleValidation = {
    create
}