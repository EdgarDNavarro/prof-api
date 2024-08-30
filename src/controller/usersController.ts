import { NextFunction, Request, Response } from "express";
import * as usersServices from '../services/usersServices'
import { validationResult } from "express-validator";
import { NewUser, NonPassUser, User, UUUID } from "../types";
import { respError, respOk } from "../utils";
import bcrypt from 'bcrypt'
import { sign } from "../jwt/jwt";

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await usersServices.getUsersWithoutPass()
        res.json(respOk(users))
    } catch (error: any) {
        next(error)
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    try { 
        const id = req.params.id as UUUID
        const user = await usersServices.findByIdNonPassUser(id)
        
        return user ? res.json(respOk(user)) : res.status(404).json(respError({msg: 'user not found'}))
    } catch (error: any) {
        next(error)
    }
}

export const registry = async (req: Request, res: Response, next: NextFunction) => {

    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    const { email, password, language, currency } = req.body as NewUser

    try {
        const newUser: NewUser = {
            email,
            password,
            language,
            currency 
        }
    
        const addedUser = await usersServices.addUser(newUser)
    
        res.json(respOk(addedUser))
    } catch (error: any) {
        next(error)
    }
}

export const putLangCurrency = async (req: Request, res: Response, next: NextFunction) => {

    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    const { id, language, currency } = req.body as Pick<User, 'id' | 'currency' | 'language' >

    try {
        const user = await usersServices.findById(id)
        if(!user) {
            return res.status(404).json(respError({msg: 'user not found'}))
        }
        user.set({language, currency})
        await user.save()
        res.json(respOk(user))
        
    } catch (error: any) {
        next(error)
    }
}

export const putEmail = async (req: Request, res: Response, next: NextFunction) => {

    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    const { id, email } = req.body as Pick<User, 'id' | 'email'>

    try {
        const user = await usersServices.findById(id)

        if(!user) {
            return res.status(404).json(respError({msg: 'user not found'}))
        }

        user.email = email
        await user.save()

        res.json(respOk(user))
        
    } catch (error: any) {
        next(error)
    }
}

export const putPass = async (req: Request, res: Response, next: NextFunction) => {

    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    const { id, password, new_password } = req.body 

    try {

        const user = await usersServices.findById(id)

        if(!user) {
            return res.status(404).json(respError({msg: 'user not found'}))
        }

        const isPasswordValid = await user.verifyPassword(password)
        
        if(!isPasswordValid) {
            return res.status(401).json(respError({msg: 'Password is incorrect'}))
        }

        if(password === new_password) {
            return res.json(respError({msg: 'The password cannot be the same as the previous one'}))
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash( new_password, salt )

        await user.save()

        res.json(respOk(user))
        
    } catch (error: any) {
        next(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.json(respError(result.array()))
    }

    try {
        const { email, password } = req.body as Pick<User, 'password' | 'email'>

        const user = await usersServices.findUserByEmail(email)
    
        if(!user) {
            return res.status(401).json(respError({msg: 'The email or password is incorrect'}))
        }
    
        const isPasswordValid = await user.verifyPassword(password)
    
        if(!isPasswordValid) {
            return res.status(401).json(respError({msg: 'The email or password is incorrect'}))
        }
        const { id, confirmed, language, currency, Tutor, Student } = user
    
        const token = sign({id: user.id, email: user.email})
        const userData = {
            id,
            email,
            confirmed,
            language,
            currency,
            Tutor,
            Student
        }
    
        return res.json(respOk({token, userData: userData}))
    } catch (error) {
        next(error)
    }
}