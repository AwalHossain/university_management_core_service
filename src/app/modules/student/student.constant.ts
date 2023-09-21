

export const studentFilterableFields: string[] = [
    'searchTerm',
    'studentId',
    'email',
    'contactNo',
    'gender',
    'bloodGroup',
    'gender',
    'academicFacultyId',
    'academicDepartmentId',
    'academicSemesterId'
]

export const studentSearchableFields: string[] = [
    'firstName',
    'lastName',
    'middleName',
    'email',
    'contactNo',
    'studentId'
]

export const studentRelationalFields: string[] = [
    'academicFacultyId',
    'academicDepartmentId',
    'academicSemesterId'
];

export const studentRelationalFieldsMapper: { [key: string]: string } = {
    'academicFacultyId': 'academicFaculty',
    'academicDepartmentId': 'academicDepartment',
    'academicSemesterId': 'academicSemester'
}



export const STUDENT_EVENT_CREATED = 'student_event_created';
export const STUDENT_EVENT_UPDATED = 'student_event_updated';
export const STUDENT_EVENT_DELETED = 'student_event_deleted';