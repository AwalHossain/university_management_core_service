import { z } from "zod";


const create = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required'
        }),
        academicFacultyId: z.string({
            required_error: 'Academic Faculty is required'
        })
    })
})

const update = z.object({
    body: z.object({
        title: z.string().optional(),
        academicFacultyId: z.string().optional()
    })
})


export const academicDepartmentValidator = {
    create,
    update
}