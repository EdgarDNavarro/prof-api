import { Currency, Language, LessonMinutes, LessonStatuses } from "./enums";

const isLanguage = (language: any): boolean => {
    return Object.values(Language).includes(language)
}

const isCurrency = (currency: any): boolean => {
    return Object.values(Currency).includes(currency)
}

const isLessonMinutes = (duration_minutos: any): boolean => {
    return Object.values(LessonMinutes).includes(duration_minutos)
}

const isLessonStatus = (status: any): boolean => {
    return Object.values(LessonStatuses).includes(status)
}

export const parseLanguage = (fromReq: any): Language => {
    if(!isLanguage(fromReq)) {
        throw new Error('Incorrect type languaje')
    }

    return fromReq
}

export const parseCurrency = (fromReq: any): Currency => {
    if(!isCurrency(fromReq)) {
        throw new Error('Incorrect type currency')
    }

    return fromReq
}

export const parseLessonMinutes = (fromReq: any): Currency => {
    if(!isLessonMinutes(fromReq)) {
        throw new Error('Incorrect type minutes, only 25 or 50')
    }

    return fromReq
}

export const parseLessonStatus = (fromReq: any): LessonStatuses => {
    if(!isLessonStatus(fromReq)) {
        throw new Error('Incorrect type status, only Unscheduled, Scheduled, In progress or Completed')
    }

    return fromReq
}

export const respOk = (data: unknown) => {
    return { success: true, data }
}

export const respError = (data: unknown) => {
    return { error: true, data }
}