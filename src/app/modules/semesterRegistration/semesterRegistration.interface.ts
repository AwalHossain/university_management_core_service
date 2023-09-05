

export type ISemesterRegRequest  = {
    searchTerm?: string;
    id?: string;
    status?: string;
    startDate?: Date;
    endDate?: Date;
    academicSemesterId?: string;
}



export type IEnrollCousePayload =  {
    offeredCourseId: string;
    offeredCourseSectionId: string;
}