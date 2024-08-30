import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import { CustomPrice, Lesson, NewCustomPrice, NewLesson } from "../types"
import { respError, respOk } from "../utils"
import * as lessonServices from '../services/lessonsServices'
import { LessonStatuses } from "../enums"


export const createLesson = async (req: Request, res: Response, next: NextFunction) => {

    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    const { scheduled_at, duration_minutos, student_id, tutor_id } = req.body as NewLesson

    try {
        const newLesson: NewLesson = { scheduled_at, duration_minutos, student_id, tutor_id }
    
        const addedLesson = await lessonServices.addLesson(newLesson)
    
        res.json(respOk(addedLesson))
    } catch (error: any) {
        next(error)
    }
}

export const scheduleLesson = async (req: Request, res: Response, next: NextFunction) => {

    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    const { scheduled_at, id } = req.body as Pick<Lesson, 'id' | 'scheduled_at'>

    try {
    
        const lesson = await lessonServices.findLessonById(id)
        if(!lesson) {
            return res.status(404).json(respError({msg: 'Lesson not found'}))
        }

        lesson.scheduled_at = scheduled_at
        lesson.status = LessonStatuses.SCHEDULED
        await lesson.save()
    
        res.json(respOk(lesson))
    } catch (error: any) {
        next(error)
    }
}

export const statusLesson = async (req: Request, res: Response, next: NextFunction) => {

    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    const { status, id } = req.body as Pick<Lesson, 'id' | 'status'>

    try {
    
        const lesson = await lessonServices.findLessonById(id)
        if(!lesson) {
            return res.status(404).json(respError({msg: 'Lesson not found'}))
        }

        lesson.status = status
        await lesson.save()
    
        res.json(respOk(lesson))
    } catch (error: any) {
        next(error)
    }
}

export const getLessons = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lesson = await lessonServices.findLesson()
        res.json(respOk(lesson))
    } catch (error) {
        next(error)
    }
}

export const getLessonById = async (req: Request, res: Response, next: NextFunction) => {
    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    try {
        const id = req.params.id as Lesson['id']
        const lesson = await lessonServices.findLessonById(id)
        if(!lesson) {
            return res.status(404).json(respError({msg: 'Lesson not found'}))
        }
        res.json(respOk(lesson))
    } catch (error) {
        next(error)
    }
}

export const getLessonsByTutorId = async (req: Request, res: Response, next: NextFunction) => {
    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    try {
        const tutor_id = req.params.id as Lesson['tutor_id']
        const lesson = await lessonServices.findLessonsByTutorId(tutor_id)

        res.json(respOk(lesson))
    } catch (error) {
        next(error)
    }
}

export const getLessonsByStudentId = async (req: Request, res: Response, next: NextFunction) => {
    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    try {
        const student_id = req.params.id as Lesson['student_id']
        const lesson = await lessonServices.findLessonsByStudentId(student_id)

        res.json(respOk(lesson))
    } catch (error) {
        next(error)
    }
}

export const createCustomPrice = async (req: Request, res: Response, next: NextFunction) => {

    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    const { price, student_id, tutor_id } = req.body as NewCustomPrice

    try {
        const exitsCustomPrice = await lessonServices.findCustomPriceByIds(student_id, tutor_id)

        if(exitsCustomPrice) {
            exitsCustomPrice.price = price
            await exitsCustomPrice.save()
            return res.json(respOk(exitsCustomPrice))
        }

        const newCustomPrice: NewCustomPrice = { price, student_id, tutor_id }
    
        const addedCustomPrice = await lessonServices.addCustomPrice(newCustomPrice)
    
        res.json(respOk(addedCustomPrice))
    } catch (error: any) {
        next(error)
    }
}

export const getCustomPrice = async (req: Request, res: Response, next: NextFunction) => {

    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    const { student_id, tutor_id } = req.params as Pick<CustomPrice, 'student_id' | 'tutor_id'>

    try {
        const customPrice = await lessonServices.findCustomPriceByIds(student_id, tutor_id)

        if(!customPrice) {
            return res.status(404).json(respError({msg: 'Custom price not found for thist student_id and tutor_id'}))
        }

        return res.json(respOk(customPrice))
    } catch (error: any) {
        next(error)
    }
}