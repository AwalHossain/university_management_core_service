
export type IcourseCreateData = {
    title: string;
    code: string;
    credits: number;
    preRequisiteCourses: IPreRequisiteCourseRequest[];
}

export type IPreRequisiteCourseRequest =  {
        courseId: string;
        isDeleted?: boolean;
    };


export type ICourseFilterRequest = {
    searchTerm?: string | undefined;
    id?: string | undefined;
    code?: string | undefined;
}