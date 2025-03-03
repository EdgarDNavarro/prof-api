import { NextFunction, Request, Response } from "express";
import * as usersServices from '../services/usersServices'
import { NewUser, User, UUUID } from "../types";
import { respError, respOk } from "../utils";
import bcrypt from 'bcrypt'
import { createConfirmedToken, sign, verifyJWT } from "../jwt/jwt";
import { AuthEmail } from "../emails/AuthEmail";

export const getUsers = async (req: Request, res: Response) => {
    if (!req.user.Tutor && !req.user.Student) {
        res.json(respError({
            confirmed: req.user.confirmed,
            email: req.user.email,
            currency: req.user.currency,
            id: req.user.id,
            language: req.user.language,
            token: req.user.token
        }))
        console.log("Get user");

        return
    }
    res.json(respOk(req.user))
    return
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const id = req.params.id as UUUID
        const user = await usersServices.findByIdNonPassUser(id)

        return user ? res.json(respOk(user)) : res.status(404).json(respError({ msg: 'user not found' }))
    } catch (error: any) {
        next(error)
    }
}

export const registry = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, language, currency } = req.body

    try {

        const { otpToken, otp } = createConfirmedToken()

        const newUser: NewUser = {
            email,
            password,
            language,
            currency,
            token: otpToken
        }

        await usersServices.addUser(newUser)

        AuthEmail.sendConfirmationEmail({
            email: newUser.email,
            token: otp
        })

        res.json(respOk("Created"))
    } catch (error: any) {
        next(error)
    }
}

export const confirmAccount = async (req: Request, res: Response, next: NextFunction) => {
    const { email, token } = req.body

    try {
        const user = await usersServices.findUserByEmail(email)
        if (!user) {
            return res.status(404).json(respError({ msg: 'user not found' }))
        }
        if (!user.token) {
            return res.status(404).json(respError({ msg: 'token not found' }))
        }
        const userToken = verifyJWT(user.token)
        console.log(userToken);

        if (!userToken || typeof userToken === 'string' || userToken.otp !== token.toString()) {
            return res.status(401).json(respError({ msg: 'token no valid' }))
        }

        user.confirmed = true
        user.token = null
        user.save()
        res.json(respOk("Account confirmed"))

    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json(respError({ msg: 'Token expired' }))
        }
        next(error)
    }
}

export const requestConfirmationCode = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body
    //TODO: verificar si ya esta confirmado y no mandar email
    try {
        const user = await usersServices.findUserByEmail(email)
        if (!user) {
            return res.status(404).json(respError({ msg: 'user not found' }))
        }
        const { otpToken, otp } = createConfirmedToken()
        user.token = otpToken
        await user.save()

        AuthEmail.sendConfirmationEmail({
            email,
            token: otp
        })

        res.json(respOk({ msg: 'Se envio el correo' }))
    } catch (error: any) {
        next(error)
    }
}

export const putCurrency = async (req: Request, res: Response, next: NextFunction) => {
    const { currency } = req.body

    try {
        req.user.set({ currency })
        await req.user.save()
        res.json(respOk(req.user))

    } catch (error: any) {
        next(error)
    }
}

export const putLang = async (req: Request, res: Response, next: NextFunction) => {
    const { language } = req.body

    try {
        req.user.set({ language })
        await req.user.save()
        res.json(respOk("Success"))

    } catch (error: any) {
        next(error)
    }
}

export const putEmail = async (req: Request, res: Response, next: NextFunction) => {


    const { id, email } = req.body as Pick<User, 'id' | 'email'>

    try {
        const user = await usersServices.findById(id)

        if (!user) {
            return res.status(404).json(respError({ msg: 'user not found' }))
        }

        user.email = email
        await user.save()

        res.json(respOk(user))

    } catch (error: any) {
        next(error)
    }
}

export const putPass = async (req: Request, res: Response, next: NextFunction) => {


    const { id, password, new_password } = req.body

    try {

        const user = await usersServices.findById(id)

        if (!user) {
            return res.status(404).json(respError({ msg: 'user not found' }))
        }

        const isPasswordValid = await user.verifyPassword(password)

        if (!isPasswordValid) {
            return res.status(401).json(respError({ msg: 'Password is incorrect' }))
        }

        if (password === new_password) {
            return res.json(respError({ msg: 'The password cannot be the same as the previous one' }))
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(new_password, salt)

        await user.save()

        res.json(respOk(user))

    } catch (error: any) {
        next(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email, password } = req.body as Pick<User, 'password' | 'email'>

        const user = await usersServices.findUserByEmail(email)

        if (!user) {
            return res.status(401).json(respError({ msg: 'The email or password is incorrect' }))
        }

        const isPasswordValid = await user.verifyPassword(password)

        if (!isPasswordValid) {
            return res.status(401).json(respError({ msg: 'The email or password is incorrect' }))
        }
        const { id, confirmed, language, currency, Tutor, Student } = user

        if (!confirmed) {
            const { otpToken, otp } = createConfirmedToken()
            user.token = otpToken
            await user.save()

            AuthEmail.sendConfirmationEmail({
                email: user.email,
                token: otp
            })

            return res.status(403).json(respError({ msg: 'We have sent a confirmation email' }))
        }

        // Generamos el access token con duración corta
        const accessToken = sign({ id: user.id, email: user.email }, '7d');
        // Generamos el refresh token con duración más larga
        const refreshToken = sign({ id: user.id, email: user.email }, '180d');


        const userData = {
            id,
            email,
            confirmed,
            language,
            currency,
            Tutor,
            Student
        }

        // Enviamos el refresh token en una cookie HttpOnly
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,     // Evita que sea accesible por JavaScript
            secure: false,       // Asegúrate de usar HTTPS en producción
            sameSite: 'strict', // Protege contra ataques CSRF
            maxAge: 6 * 30 * 24 * 60 * 60 * 1000 // 6 meses segun yo
        });

        return res.json(respOk({ token: accessToken, userData: userData }))
    } catch (error) {
        next(error)
    }
}

export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json(respError({ msg: 'No refresh token provided' }));
    }

    try {
        // Verificamos la validez del refresh token
        const decoded = verifyJWT(refreshToken);

        if (typeof decoded === 'string') return res.status(401).json(respError({ msg: 'Invalid refresh token' }));

        // Generamos un nuevo access token
        const accessToken = sign({ id: decoded.id, email: decoded.email }, '1h');

        return res.json(respOk({ token: accessToken }));
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json(respError({ msg: 'Refresh token expired' }));
        }
        return res.status(401).json(respError({ msg: 'Invalid refresh token' }));
    }
};