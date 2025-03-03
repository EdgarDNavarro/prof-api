import { NextFunction, Request, Response } from "express"
import { respOk } from "../utils"
import * as profileService from '../services/profileServices'
import { NewTutorDescriptions } from "../types"

export const createAndUpdateTutorDescription = async (req: Request, res: Response, next: NextFunction) => {
    const { tutor_id, type, content } = req.body as NewTutorDescriptions

    try {
        const newDescription: NewTutorDescriptions = { tutor_id, type, content }

        const description = await profileService.findDescriptByTypeForTutor(tutor_id, type)

        if (description) {
            description.content = content
            await description.save()
            return res.json(respOk("Success"))
        }

        await profileService.addTutorDescription(newDescription)

        res.json(respOk("Success"))
    } catch (error: any) {
        next(error)
    }
}

export const getTutorDescriptions = async (req: Request, res: Response, next: NextFunction) => {
    const tutor_id = req.params.id as NewTutorDescriptions['tutor_id']

    try {

        const descriptions = await profileService.findTutorDescriptionsByTutorId(tutor_id)

        res.json(respOk(descriptions))
    } catch (error: any) {
        next(error)
    }
}