import { NextFunction, Request, Response } from "express"
import { respError, respOk } from "../utils"
import * as studentLevelsServices from '../services/studentLevelsServices'
import { NewTutorStudentLevel } from "../types"

export const createTutorStudentLevel = async (req: Request, res: Response, next: NextFunction) => {

    const { student_level_id, tutor_id } = req.body as NewTutorStudentLevel

    try {
        const newTutorStudentLevel: NewTutorStudentLevel = {student_level_id, tutor_id}

        const tutorStudentLevel = await studentLevelsServices.findTutorStudentLevel(newTutorStudentLevel)
        if(tutorStudentLevel) {
            return res.json(respOk({msg: 'TutorStudentLevel already exists'}))
        }

        const addedTutorStudentLevel = await studentLevelsServices.addTutorStudentLevel(newTutorStudentLevel)

        res.json(respOk(addedTutorStudentLevel))
    } catch (error) {
        next(error)
    }
}

export const deleteTutorStudentLevel = async (req: Request, res: Response, next: NextFunction) => {

    const student_level_id = +req.params.student_level_id as NewTutorStudentLevel['student_level_id']
    const tutor_id = req.params.tutor_id as NewTutorStudentLevel['tutor_id']

    try {
        const newTutorStudentLevel: NewTutorStudentLevel = {student_level_id, tutor_id}

        const tutorStudentLevel = await studentLevelsServices.findTutorStudentLevel(newTutorStudentLevel)
        if(!tutorStudentLevel) {
            return res.json(respError({msg: 'TutorStudentLevel not found'}))
        }

        await tutorStudentLevel.destroy()

        res.json(respOk({msg: 'TutorStudentLevel deleted succefully'}))
    } catch (error) {
        next(error)
    }
}

export const getTutorStudentLevels = async (req: Request, res: Response, next: NextFunction) => {

    const tutor_id = req.params.id as NewTutorStudentLevel['tutor_id']

    try {
        const tutorStudentLevels = await studentLevelsServices.findTutorStudentLevels(tutor_id)
        res.json(respOk(tutorStudentLevels))
    } catch (error) {
        next(error)
    }
}

export const getStudentLevels = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentLevel = await studentLevelsServices.findAllStudentLevels()
        res.json(respOk(studentLevel))
    } catch (error) {
        next(error)
    }
}