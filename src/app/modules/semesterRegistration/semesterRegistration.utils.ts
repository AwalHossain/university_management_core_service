/* eslint-disable @typescript-eslint/no-explicit-any */


const getAvailableCourse = async (
    completedCourse: any,
    studentCurrentSemesterTakenCourse: any,
    offeredCourse: any,
) => {
    console.log('getAvailableCourse');
    const completedCourseIds = completedCourse.map((course: any) => course.courseId);

    const availableCourseList = offeredCourse.filter((course: any) => !completedCourseIds.includes(course.courseId))
        .filter((course: any) => {
            const preRequisite = course.course.preRequisite;

            if (preRequisite.length === 0) {
                return true;
            } else {
                const preRequisiteIds = preRequisite.map((preRequisite: any) => preRequisite.preRequisiteId);
                return preRequisiteIds.every((preRequisiteId: any) => completedCourseIds.includes(preRequisiteId));
            }
        })
        .map((course: any) => {
            const isAlreadyTakenCourse = studentCurrentSemesterTakenCourse.find(
                (c: any) => c.offeredCourseId === course.id
            );
            if (isAlreadyTakenCourse) {
                course.offeredCourseSections.map((section: any) => {
                    if (section.id === isAlreadyTakenCourse.offeredCourseSectionId) {
                        section.isTaken = true
                    }
                    else {
                        section.isTaken = false
                    }
                })
                return {
                    ...course,
                    isTaken: true
                }
            } else {
                course.offeredCourseSections.map((section: any) => {
                    section.isTaken = false
                });
                console.log(course, 'course');

                return {
                    ...course,
                    isTaken: false
                }
            };
        });


    console.log(availableCourseList, 'availableCourseList');

    return availableCourseList;
}


export const SemesterRegistrationUtils = {
    getAvailableCourse
}