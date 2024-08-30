import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import { EditTutor, NewTutor, Tutor } from "../types"
import { respError, respOk } from "../utils"
import * as tutorsServices from '../services/tutorsServices'

export const createTutor = async (req: Request, res: Response, next: NextFunction) => {

    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    const {
        user_id,
        first_name,
        last_name,
        phone_number,
        timezone,
        photo,
        bio,
        country_of_birth,
        video_link,
        video_thumbnail,
        years_of_experience,
        class_price
    } = req.body as NewTutor

    try {
        const newTutoData: NewTutor = {
            user_id,
            first_name,
            last_name,
            phone_number: phone_number ? phone_number.replace(/\s+/g, '') : undefined,
            timezone,
            photo: photo ? photo : undefined,
            bio: bio ? bio : undefined,
            country_of_birth,
            video_link: video_link ? video_link : undefined,
            video_thumbnail: video_thumbnail ? video_thumbnail : undefined,
            years_of_experience,
            class_price
        }
    
        const addedTutor = await tutorsServices.addTutor(newTutoData)
        res.json(respOk(addedTutor))
    } catch (error: any) {
        next(error)
    }
}

export const getTutors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tutor = await tutorsServices.findTutors()
        res.json(respOk(tutor))
    } catch (error: any) {
        next(error)
    }
}

export const getTutorsById = async (req: Request, res: Response, next: NextFunction) => {
    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    try {
        const id = req.params.id as Tutor['id']
        const tutor = await tutorsServices.findTutorsById(id)
        if(!tutor) {
            return res.status(404).json(respError({msg: 'Tutor not found'}))
        }
        res.json(respOk(tutor))
    } catch (error: any) {
        next(error)
    }
}

export const putTutor = async (req: Request, res: Response, next: NextFunction) => {
    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }
    const {
        id,
        first_name,
        last_name,
        phone_number,
        timezone,
        photo,
        bio,
        country_of_birth,
        video_link,
        video_thumbnail,
        years_of_experience,
        class_price,
        profile_hidden
    } = req.body as EditTutor

    try {
        const tutor = await tutorsServices.findTutorsById(id)

        if(!tutor) {
            return res.status(404).json(respError({msg: "Tutor not found"}))
        }

        tutor.set({
            first_name,
            last_name,
            phone_number: phone_number ? phone_number.replace(/\s+/g, '') : tutor.phone_number,
            timezone,
            photo: photo ? photo : tutor.photo,
            bio: bio ? bio : tutor.bio,
            country_of_birth,
            video_link: video_link ? video_link : tutor.video_link,
            video_thumbnail: video_thumbnail ? video_thumbnail : tutor.video_thumbnail,
            years_of_experience,
            class_price,
            profile_hidden: profile_hidden !== undefined && profile_hidden !== null ? profile_hidden : tutor.profile_hidden
        })

        await tutor.save()
        return res.json(respOk(tutor))
    } catch (error: any) {
        next(error)
    }
}

export const profileVisibility = async (req: Request, res: Response, next: NextFunction) => {
    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    const { id, profile_hidden } = req.body as Pick<Tutor, 'id' | 'profile_hidden'>

    try {
        const tutor = await tutorsServices.findTutorsById(id)

        if(!tutor) {
            return res.status(404).json(respError({msg: "Tutor not found"}))
        }
        tutor.profile_hidden = profile_hidden
        await tutor.save()
        return res.json(respOk(tutor))
    } catch (error) {
        next(error)
    }
}