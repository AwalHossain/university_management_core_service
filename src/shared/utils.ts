/* eslint-disable no-unused-vars */

import { DAY_OF_WEEK } from "@prisma/client";

export const asyncForEach = async <T>(
    array: T[],
    callback: (item: T, index: number, array: T[]) => Promise<void>
): Promise<void> => {
  
    await Promise.all(array.map(callback));
};  


type TimeSlot = {
    startTime: string;
    endTime: string;
    dayOfWeek: DAY_OF_WEEK;
}


export const hasTimeConflict = (newslot: TimeSlot, existingSlots: TimeSlot[]) => {

    for(const slot of existingSlots){
        const existingStart = new Date(`1970-01-01T${slot.startTime}:00`)
        const existingEnd = new Date (`1970-01-01T${slot.endTime}:00`)

        const newStart = new Date(`1970-01-01T${newslot.startTime}:00`)
        const newEnd = new Date (`1970-01-01T${newslot.endTime}:00`);

        if(newStart >= existingStart && newEnd <= existingEnd){
            return true;
        }
    }
    return false;
}
