import Review from "../database/models/Reviews";
import StudentLevels from "../database/models/StudentLevels";
import TutorDescriptions from "../database/models/TutorDescriptions";
import Tutor from "../database/models/Tutors";
import { NewTutor, UUUID } from "../types";

export const addTutor = async (newTutor: NewTutor): Promise<Tutor> => {
    const tutor = await Tutor.create(newTutor)
    return tutor
}

export const findTutors = async (): Promise<Tutor[]> => {
    const tutor = await Tutor.findAll()
    return tutor
}

export const findTutorsById = async (id: UUUID): Promise<Tutor | undefined> => {
    const tutor = await Tutor.findByPk(id, {
        include: [
            { model: Review },
            { model: TutorDescriptions },
            { model: StudentLevels },
        ]
    })

    if (tutor) {
        return tutor
    }
    return undefined
}

export const findOnlyTutorById = async (id: UUUID): Promise<Tutor | undefined> => {
    const tutor = await Tutor.findByPk(id)
    if (tutor) {
        return tutor
    }
    return undefined
}