import { DAY_OF_WEEK } from "@prisma/client";

export type IOfferedCourseSectionFilterRequest = {
    searchTerm?: string;
    title?: string;
    offeredCourseId?: string;
    semesterRegistrationId?: string;
}


export type IClassSchedule = {
    startTime: string;
    endTime: string;
    dayOfWeek: DAY_OF_WEEK;
    roomId: string;
    facultyId: string;
}


export type IOfferedCourseSectionCreate = {
    title: string;
    offeredCourseId: string;
    maxCapacity: number;
    classSchedule: IClassSchedule[];
}