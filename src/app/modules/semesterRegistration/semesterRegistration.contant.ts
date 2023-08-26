
export const SemesterRegistrationFilterableFields = [ 'searchTerm', 'status' ]

/**
 * Fields that can be searched for in the semester registration module.
 */
export const SemesterRegistrationSearchableFields = [ 'id', 'status', 'startData', 'endDate' ]




export const SemesterRegistrationRelationalFields = [ 'academicSemesterId' ];

export const SemesterRegistrationRelationalFieldsMapper:{[key:string]:string} = {
    ['academicSemesterId']: 'academicSemester'
}
