import TutorDescriptions from "../database/models/TutorDescriptions";
import { UUUID, NewTutorDescriptions } from "../types";

export const addTutorDescription = async (newTutorDescription: NewTutorDescriptions) : Promise<TutorDescriptions> => {
    const tutorDescription = await TutorDescriptions.create(newTutorDescription)
    return tutorDescription
}

export const findTutorDescriptionsById = async (id: UUUID) : Promise<TutorDescriptions | undefined> => {
    const tutorDescription = await TutorDescriptions.findByPk(id)
    if(tutorDescription) {
        return tutorDescription
    }
    return undefined
}

export const findTutorDescriptionsByTutorId = async (tutor_id: UUUID) : Promise<TutorDescriptions[]> => {
    const tutorDescription = await TutorDescriptions.findAll({where: {tutor_id}})
    return tutorDescription
}

export const findDescriptByTypeForTutor = async (tutor_id: UUUID, type: TutorDescriptions['type']) : Promise<TutorDescriptions | undefined > => {
    const tutorDescription = await TutorDescriptions.findOne({where: {tutor_id, type}})
    if(tutorDescription){
        return tutorDescription
    }
    return undefined
}