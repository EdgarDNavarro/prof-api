import { NextFunction, Request, Response } from "express"
import { NewStudent, Student, UUUID } from "../types"
import { respError, respOk } from "../utils"
import * as studentsServices from '../services/studentsServices'


export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, first_name, last_name, phone_number, timezone, photo } = req.body
    try {
        const newStudentData: NewStudent = {
            user_id,
            first_name,
            last_name,
            phone_number: phone_number ? phone_number.replace(/\s+/g, '') : undefined,
            timezone,
            photo
        }
        await studentsServices.addStudent(newStudentData)
        res.json(respOk("Created"))
    } catch (error: any) {
        next(error)
    }
}

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await studentsServices.findStudents()
        res.json(respOk(students))
    } catch (error: any) {
        next(error)
    }
}

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as UUUID
        const student = await studentsServices.findStudentById(id)
        return student ? res.json(respOk(student)) : res.status(404).json(respError({ msg: 'Student not found' }))
    } catch (error: any) {
        next(error)
    }
}

export const getStudentByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = req.params.user_id as UUUID
        const student = await studentsServices.findStudentByUserId(user_id)
        return student ? res.json(respOk(student)) : res.status(404).json(respError({ msg: 'Student not found' }))
    } catch (error: any) {
        next(error)
    }
}

export const putStudent = async (req: Request, res: Response, next: NextFunction) => {
    const { id, first_name, last_name, phone_number, timezone } = req.body as Student
    try {
        const student = await studentsServices.findStudentById(id)
        if (!student) {
            return res.status(404).json(respError({ msg: 'Student not found' }))
        }
        student.set({
            first_name,
            last_name,
            phone_number: phone_number ? phone_number.replace(/\s+/g, '') : student.phone_number,
            timezone
        })
        await student.save()
        res.json(respOk(student))
    } catch (error: any) {
        next(error)
    }
}