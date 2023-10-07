import { RedisClient } from "../../../shared/redis"
import { FACULTY_EVENT_CREATED, FACULTY_EVENT_DELETED, FACULTY_EVENT_UPDATED } from "./faculty.constant"
import { FacultyService } from "./faculty.service"



const initFacultyEvent = async () => {
    RedisClient.subscribe(FACULTY_EVENT_CREATED, async (e) => {
        const data = JSON.parse(e)
        console.log(data, 'faculty from event');

        await FacultyService.createFacultyEvent(data)
    })

    RedisClient.subscribe(FACULTY_EVENT_UPDATED, async (e) => {
        const data = JSON.parse(e)

        await FacultyService.updateFacultyFromEvent(data);
    })

    RedisClient.subscribe(FACULTY_EVENT_DELETED, async (e) => {
        const data = JSON.parse(e)

        await FacultyService.deleteFromEvent(data);
    })
}


export default initFacultyEvent;