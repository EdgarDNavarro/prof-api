import { NextFunction, Request, Response } from "express"
import { EditTutor, NewTutor, Tutor } from "../types"
import { respError, respOk } from "../utils"
import * as tutorsServices from '../services/tutorsServices'

export const createTutor = async (req: Request, res: Response, next: NextFunction) => {
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
    } = req.body

    try {
        const newTutoData: NewTutor = {
            user_id,
            first_name,
            last_name,
            phone_number: phone_number ? phone_number : undefined,
            timezone,
            photo: photo ? photo : undefined,
            bio: bio ? bio : undefined,
            country_of_birth,
            video_link: video_link ? video_link : undefined,
            video_thumbnail: video_thumbnail ? video_thumbnail : undefined,
            years_of_experience,
            class_price
        }

        await tutorsServices.addTutor(newTutoData)
        res.json(respOk("Created"))
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
    try {
        const id = req.params.id as Tutor['id']
        const tutor = await tutorsServices.findTutorsById(id)
        if (!tutor) {
            return res.status(404).json(respError({ msg: 'Tutor not found' }))
        }
        res.json(respOk(tutor))
    } catch (error: any) {
        next(error)
    }
}

export const putTutor = async (req: Request, res: Response, next: NextFunction) => {
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
    } = req.body
    try {
        const tutor = await tutorsServices.findOnlyTutorById(id)

        if (!tutor) {
            return res.status(404).json(respError({ msg: "Tutor not found" }))
        }

        tutor.set({
            first_name,
            last_name,
            phone_number: phone_number ? phone_number : tutor.phone_number,
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
        return res.json(respOk("Update succesfully"))
    } catch (error: any) {
        next(error)
    }
}

export const profileVisibility = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as Pick<Tutor, 'id'>
    try {
        const tutor = await tutorsServices.findOnlyTutorById(id)

        if (!tutor) {
            return res.status(404).json(respError({ msg: "Tutor not found" }))
        }
        tutor.profile_hidden = !tutor.dataValues.profile_hidden
        await tutor.save()
        return res.json(respOk("updated"))
    } catch (error) {
        next(error)
    }
}

export const updateClassPrice = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as Pick<Tutor, 'id'>
    const { class_price } = req.body
    try {
        const tutor = await tutorsServices.findOnlyTutorById(id)

        if (!tutor) {
            return res.status(404).json(respError({ msg: "Tutor not found" }))
        }

        tutor.class_price = class_price
        console.log(tutor.class_price, class_price);

        await tutor.save()
        return res.json(respOk("updated"))
    } catch (error) {
        next(error)
    }
}