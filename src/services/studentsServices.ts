import Student from "../database/models/Students";
import { NewStudent, UUUID } from "../types";


export const addStudent = async (student: NewStudent) : Promise<Student> => {
    const newStudent = await Student.create(student)
    return newStudent
}

export const findStudents = async () : Promise<Student[]> => {
    const students = await Student.findAll()
    return students
}

export const findStudentById = async (id: UUUID) : Promise<Student | undefined> => {
    const student = await Student.findByPk(id)
    if(student) {
        return student
    }
    return undefined
}

export const findStudentByUserId = async (user_id: UUUID) : Promise<Student | undefined> => {
    const student = await Student.findOne({where: {user_id}})
    if(student) {
        return student
    }
    return undefined
}