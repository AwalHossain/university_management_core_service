import { IAcademicSemesterCodes, IAcademicSemesterMonths, IAcademicSemesterTitles } from "./academicSemester.interface";

export const academicSemesterFilterableFields = ['searchTerm', 'code', 'startMonth', 'endMonth'];
export const academicSemesterSearchableFields = ['title', 'code', 'startMonth', 'endMonth'];

export const EVENT_ACADEMIC_SEMESTER_CREATED = 'academic-semester-created';
export const EVENT_ACADEMIC_SEMESTER_UPDATED = 'academic-semester-updated';
export const EVENT_ACADEMIC_SEMESTER_DELETED = 'academic-semester-deleted';



export const academicSemesterTitles: IAcademicSemesterTitles[] = [
    'Autumn',
    'Spring',
    'Summer',
]

export const academicSemesterCodes: IAcademicSemesterCodes[] = [
    '01',
    '02',
    '03',
]

export const academicSemesterMonths: IAcademicSemesterMonths[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]


export const academicSemesterTitleCodeMappping: {
    [key: string]: string;
} = {
    "Autumn": '01',
    "Spring": '02',
    "Summer": '03',
}
