import type { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator" 
import { respError } from "../utils"

export const validation = (req: Request, res: Response, next:NextFunction) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json(respError(errors.array()))
        return
    }
    next()
}