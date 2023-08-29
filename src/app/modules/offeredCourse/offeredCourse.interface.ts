


export type ICreateOfferCourse = {
    courseIds: string[];
    academicDepartmentId: string;
    semesterRegistrationId: string;
}


export type IOfferCourseFilterReq = {
    searchTerm?: string;
    courseId?: string;
    academicDepartmentId?: string;
    semesterRegistrationId?: string;
}