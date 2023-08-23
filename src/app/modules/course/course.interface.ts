
export type IcourseCreateData = {
    title: string;
    code: string;
    credits: number;
    preRequisiteCourses: {
        courseId: string;
    }[]
}


export type ICourseRequest = {
    searchTerm?: string | undefined;
    id?: string | undefined;
    code?: string | undefined;
}