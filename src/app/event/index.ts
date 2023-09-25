import initFacultyEvent from "../modules/faculty/faculty.event";
import initStudentEvent from "../modules/student/student.event";




const subscribeEvent = async () => {
    await initStudentEvent();
    await initFacultyEvent();
}


export default subscribeEvent;