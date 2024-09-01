export enum Language {
    ES = 'es',
    IT = 'it',
    PT = 'pt',
    EN = 'en',
    FR = 'fr',
    DE = 'de',
    JA = 'ja',
    ZH = 'zh',
}
export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    CHF = 'CHF',
    JPY = 'JPY',
    CNY = 'CNY',
    BRL = 'BRL',
    GBP = 'GBP'
}

export enum LessonStatuses {
    UNSCHEDULED = 'Unscheduled',
    SCHEDULED = 'Scheduled',
    INPROGRESS = 'In progress',
    COMPLETED = 'Completed'
}

export enum LessonMinutes {
    MIDDLE_CLASS = 25,
    CLASS = 50
}

export enum DescriptionType {
    INTRODUCE_YOURSELF = "introduce_yourself",
    TEACHING_EXPERIENCE = "teaching_experience",
    MOTIVATE_STUDENT = "motivate_student",
    CATCHY_TITLE = "catchy_title"
}

export enum StudentLevel {
    BEGINNER = "beginner",
    PRE_BEGINNER = "pre_beginner",
    INTERMEDIATE = "intermediate",
    UPPER_INTERMEDIATE = "upper_intermediate",
    ADVANCED = "advanced",
    NOT_SPECIFIED = "not_specified",
}