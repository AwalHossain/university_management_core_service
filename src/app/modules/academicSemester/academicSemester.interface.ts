/* eslint-disable @typescript-eslint/consistent-type-definitions */

export interface IAcademicSemesterFilterRequest {
    searchTerm?: string;
    code?: string;
    startMonth?: string;
    endMonth?: string;
}


export type IAcademicSemesterMonths =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December'

export type IAcademicSemesterTitles = 'Autumn' | 'Spring' | 'Summer'

export type IAcademicSemesterCodes = '01' | '02' | '03'
