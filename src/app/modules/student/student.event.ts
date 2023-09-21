import { RedisClient } from "../../../shared/redis"
import { STUDENT_EVENT_CREATED, STUDENT_EVENT_DELETED, STUDENT_EVENT_UPDATED } from "./student.constant"
import { StudentService } from "./student.service"




const initStudentEvent = async () => {
    RedisClient.subscribe(STUDENT_EVENT_CREATED, async (e) => {
        const data = JSON.parse(e)
        await StudentService.createStudentEvent(data)
    })

    RedisClient.subscribe(STUDENT_EVENT_UPDATED, (e) => {
        console.log(e)
    })

    RedisClient.subscribe(STUDENT_EVENT_DELETED, (e) => {
        console.log(e)
    })
}


export default initStudentEvent;