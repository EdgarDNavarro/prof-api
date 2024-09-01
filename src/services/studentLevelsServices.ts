import StudentLevels from "../database/models/StudentLevels";
import TutorStudentLevels from "../database/models/TutorStudentLevels";
import { NewTutorStudentLevel } from "../types";

export const addTutorStudentLevel = async (newTutorStudentLevel: NewTutorStudentLevel) : Promise<TutorStudentLevels> => {
    const tutorStudentLevel = await TutorStudentLevels.create(newTutorStudentLevel)
    return tutorStudentLevel
}

export const findTutorStudentLevel = async (findTutorStudentLevel: NewTutorStudentLevel): Promise<TutorStudentLevels | undefined> => {
    const tutorStudentLevel = await TutorStudentLevels.findOne({where: findTutorStudentLevel})
    if(tutorStudentLevel){
        return tutorStudentLevel
    }
    return undefined
}

export const findTutorStudentLevels = async (tutor_id: NewTutorStudentLevel['tutor_id']): Promise<TutorStudentLevels[]> => {
    const tutorStudentLevels = await TutorStudentLevels.findAll({where: {tutor_id}})
    return tutorStudentLevels
}

export const findAllStudentLevels = async () : Promise<StudentLevels[]> => {
    const studentLevels = await StudentLevels.findAll()
    return studentLevels
}