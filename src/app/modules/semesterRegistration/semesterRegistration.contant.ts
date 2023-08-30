
export const SemesterRegistrationFilterableFields = [ 'searchTerm', 'status', 'academicSemesterId' ]

/**
 * Fields that can be searched for in the semester registration module.
 */
export const semesterRegistrationSearchableFields: string[] = ['academicSemesterId','status'];



export const SemesterRegistrationRelationalFields = [ 'academicSemesterId' ];

export const SemesterRegistrationRelationalFieldsMapper:{[key:string]:string} = {
    ['academicSemesterId']: 'academicSemester'
}
