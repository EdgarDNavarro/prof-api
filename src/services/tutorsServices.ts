import Tutor from "../database/models/Tutors";
import { NewTutor, UUUID } from "../types";

export const addTutor = async (newTutor: NewTutor) : Promise<Tutor> => {
    const tutor = await Tutor.create(newTutor)
    return tutor
}

export const findTutors = async () : Promise<Tutor[]> => {
    const tutor = await Tutor.findAll()
    return tutor
}

export const findTutorsById = async (id: UUUID) : Promise<Tutor | undefined> => {
    const tutor = await Tutor.findByPk(id)
    if(tutor) {
        return tutor
    }
    return undefined
}