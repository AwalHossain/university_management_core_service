
export const offeredCourseSectionFilterableFields = [
    'title',
    'offeredCourseId',
    'semesterRegistrationId'

];


export const offeredCourseSectionSearchableFields = [
    'title',
    'offeredCourseId',
    'semesterRegistrationId'
]


export const offeredCourseSectionRelationFields: string[] = [
    'offeredCourseId',
    'semesterRegistrationId'
]

export const offeredCourseSectionRelationFieldsMapper: {
    [key: string]: string
} = {
    offeredCourseId: 'offeredCourse',
    semesterRegistrationId: 'semesterRegistration'
}

