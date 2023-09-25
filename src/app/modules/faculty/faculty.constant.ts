
export const facultyFilterableFields: string[] = [
    'searchTerm',
    'facultyId',
    'email',
    'contactNo',
    'gender',
    'bloodGroup',
    'designation',
    'academicFacultyId',
    'academicDepartmentId'
]

export const facultySearchableFields: string[] = [
    'firstName',
    'lastName',
    'middleName',
    'email',
    'contactNo',
    'facultyId',
    'designation'
]

export const facultyRelationalFields: string[] = [
    'academicFacultyId',
    'academicDepartmentId'
];


export const facultyRelationalFieldsMapper: { [key: string]: string } = {
    'academicFacultyId': 'academicFaculty',
    'academicDepartmentId': 'academicDepartment'
}


export const FACULTY_EVENT_CREATED = 'faculty_event_created';
export const FACULTY_EVENT_UPDATED = 'faculty_event_updated';
export const FACULTY_EVENT_DELETED = 'faculty_event_deleted';