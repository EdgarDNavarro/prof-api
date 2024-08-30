import CustomPrice from "../database/models/CustomPrices"
import Lesson from "../database/models/Lessons"
import { NewCustomPrice, NewLesson } from "../types"

export const addLesson = async (lesson: NewLesson) : Promise<Lesson> => {
    const newLesson = await Lesson.create(lesson)
    return newLesson
}

export const findLesson = async () : Promise<Lesson[]> => {
    const lessons = await Lesson.findAll({order: [['scheduled_at', 'ASC']]})
    return lessons
}

export const findLessonById = async (id: Lesson['id']) : Promise<Lesson | undefined> => {
    const lesson = await Lesson.findByPk(id)
    if(lesson) {
        return lesson
    }

    return undefined
}

export const findLessonsByTutorId = async (tutor_id: Lesson['tutor_id']) : Promise<Lesson[]> => {
    const lesson = await Lesson.findAll({
        where: {tutor_id},
        order: [['scheduled_at', 'ASC']]
    })
    return lesson
}

export const findLessonsByStudentId = async (student_id: Lesson['student_id']) : Promise<Lesson[]> => {
    const lesson = await Lesson.findAll({
        where: {student_id},
        order: [['scheduled_at', 'ASC']]
    })
    return lesson
}

export const addCustomPrice = async (custom_price: NewCustomPrice) : Promise<CustomPrice> => {
    const newCustoPrice = await CustomPrice.create(custom_price)
    return newCustoPrice
}

export const findCustomPriceByIds = async (student_id: CustomPrice['student_id'], tutor_id: CustomPrice['tutor_id']) : Promise< CustomPrice | undefined > => {
    const customPrice = await CustomPrice.findOne({
        where: { student_id, tutor_id }
    })
    if(customPrice) {
        return customPrice
    }
    return undefined
}