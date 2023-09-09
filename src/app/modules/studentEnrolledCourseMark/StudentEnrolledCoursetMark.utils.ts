
type IR = {
    grade: string,
    point: number
}

const getGrade = (mark: number):IR => {
    const result = {
        grade: '',
        point: 0
    }
    if(mark >= 80){
        result.grade = 'A+';
        result.point = 4.00;
    }else if(mark >= 75 && mark < 80){
        result.grade = 'A';
        result.point = 3.75;
    }else if(mark >= 70 && mark < 75){
        result.grade = 'A-';
        result.point = 3.50;
    }else if(mark >= 65 && mark < 70){
        result.grade = 'B+';
        result.point = 3.25;
    }else if(mark >= 60 && mark < 65){
        result.grade = 'B';
        result.point = 3.00;
    }else if(mark >= 55 && mark < 60){
        result.grade = 'B-';
        result.point = 2.75;
    }else if(mark >= 50 && mark < 55){
        result.grade = 'C+';
        result.point = 2.50;
    }else if(mark >= 45 && mark < 50){
        result.grade = 'C';
        result.point = 2.25;
    }else if(mark >= 40 && mark < 45){
        result.grade = 'D';
        result.point = 2.00;
    }else if(mark < 40){
        result.grade = 'F';
        result.point = 0.00;
    }
    return result;

}


export const StudentEnrolledCourseMarkUtils = {
    getGrade
}