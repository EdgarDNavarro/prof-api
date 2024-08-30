import { Currency, Language, LessonStatuses } from "./enums";

export type UUUID = `${string}-${string}-${string}-${string}-${string}`

export type User = {
    readonly id: UUUID;
    email: string;
    password: string;
    token?: string;
    confirmed: boolean;
    language: Language;
    currency: Currency;
    Tutor?: Tutor
    Student?: Student
}

// export type NonPassUser = Pick<User, 'id' | 'username' | 'email' | 'created_at' | 'updated_at' | 'token' | 'confirmed' | 'language' | 'currency'>
export type NonPassUser = Omit<User, 'password'>
export type NewUser = Omit<User, 'id' | 'token' | 'confirmed' >

export type Student = {
    readonly id: UUUID
    first_name: string
    last_name: string
    phone_number?: string
    timezone: string
    photo?: string
    readonly user_id: User['id']
}

export type NewStudent = Omit<Student, 'id'>

export type Tutor = {
    readonly id: UUUID
    first_name: string
    last_name: string
    phone_number?: string
    timezone: string
    photo?: string
    bio?: string
    rating: number 
    country_of_birth: string 
    video_link?: string
    video_thumbnail?: string
    years_of_experience: number
    class_price: number
    balance: number
    profile_verified: boolean
    profile_hidden: boolean
    total_hours: number
    total_lessons: number
    super_tutor_badge: boolean
    readonly user_id: User['id']
}

export type NewTutor = Omit<Tutor, 'id' | 'rating' | 'balance' | 'profile_verified' | 'profile_hidden' | 'total_hours' | 'total_lessons' | 'super_tutor_badge' | 'balance'>

export type EditTutor = Omit<Tutor, 'rating' | 'balance' | 'profile_verified' | 'profile_hidden' | 'total_hours' | 'total_lessons' | 'super_tutor_badge' | 'balance' | 'user_id'> & {
    profile_hidden?: boolean
}

export type Lesson = {
    id: UUUID
    scheduled_at: Date
    duration_minutos: number
    status: LessonStatuses
    student_id: Student['id']
    tutor_id: Tutor['id']
}

export type NewLesson = Omit<Lesson, 'id' | 'status'>

export type CustomPrice = {
    id: UUUID
    price: number
    student_id: Student['id']
    tutor_id: Tutor['id']
}

export type NewCustomPrice = Omit<CustomPrice, 'id'>

export type Review = {
    id: UUUID
    rating: 1 | 2 | 3 | 4 | 5
    comment: string
    student_id: Student['id']
    tutor_id: Tutor['id']
}

export type NewReview = Omit<Review, 'id'>