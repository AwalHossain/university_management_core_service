
export const offeredCourseFilterableFields = [ 'searchTerm', 'courseId', 'academicDepartmentId' ]


export const offeredCourseSearchFields = [ 'courseId', 'academicDepartmentId','semesterRegistrationId' ]



export const offeredCourseRelationalFields: string[] = [ 'courseId', 'academicDepartmentId','semesterRegistrationId' ]

export const offeredCourseRelationalFieldsMapper: { [key: string]: string }  ={
    courseId:'course',
    academicDepartmentId:'academicDepartment',
    semesterRegistrationId:'semesterRegistration'
}