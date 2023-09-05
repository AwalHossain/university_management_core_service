import { z } from "zod";



const create = z.object({
    body: z.object({
        startDate: z.string({
            required_error: 'Start date is required'
        }),
        endDate:  z.string({
            required_error: 'Start date is required'
        }),
      status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
        minCredit: z.number({
            required_error: 'Minimum credit is required'
        }),
        maxCredit: z.number({
            required_error: 'Maximum credit is required'
        }),
        academicSemesterId: z.string({
            required_error: 'Academic semester id is required'
        }).uuid(),
    })
})


const enrollOrWithdrawCourse = z.object({
    body: z.object({
        offeredCourseId: z.string({
            required_error: 'Offered course id is required'
        }).uuid(),

        offeredCourseSectionId: z.string({
            required_error: 'Offered course section id is required'
        }).uuid()
    })
})


const update = z.object({
    body: z.object({
        id: z.string().uuid().optional(),
        startDate: z.string().optional(),
        endDate: z.string({
            required_error: 'End date must be greater than start date'
        }).optional(),
        status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']).optional(),
        minCredit: z.number({
            required_error: 'Minimum credit is required'
        }).optional(),
        maxCredit: z.number({
            required_error: 'Maximum credit is required'
        }).optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
        academicSemesterId: z.string({
            required_error: 'Academic semester id is required'
        }).uuid().optional()
    })
})


export const SemesterRegistrationValidation = {
    create,
    update,
    enrollOrWithdrawCourse
}