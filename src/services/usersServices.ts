import { NewUser, NonPassUser, UUUID } from '../types'
import User from '../database/models/Users'
import Tutor from '../database/models/Tutors'
import Student from '../database/models/Students'

export const getUsers = async (): Promise<User[]> => {
    const users = await User.findAll()

    return users
}

export const findById = async (id: UUUID): Promise<User | undefined> => {
    const user = await User.findByPk(id)
    if(user) {

        return user
    }
    return undefined
}

export const findByIdNonPassUser = async (id: UUUID): Promise<NonPassUser | undefined> => {
    const user = await User.findByPk(id)
    if(user) {

        const nonPassUser: NonPassUser = {
            id: user.id,
            email: user.email,
            token: user.token,
            confirmed: user.confirmed,
            language: user.language,
            currency: user.currency
        }

        return nonPassUser
    }
    return undefined
}

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
    const user = await User.findOne({where: {email}, include: [{model: Tutor}, {model: Student}]})
    if(user) {
        user
        return user
    }
    return undefined
}

export const getUsersWithoutPass = async (): Promise<NonPassUser[]> => {
    const users = await User.findAll()

    return users.map(({ id, email, token, confirmed, language, currency}) => {
        return {
            id,
            email,
            token,
            confirmed,
            language,
            currency
        }
    })
}

export const addUser = async (newUser : NewUser): Promise<User> => {

    const newUserSql = await User.create(newUser)

    return newUserSql
}