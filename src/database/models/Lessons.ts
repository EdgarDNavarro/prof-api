import { Model } from "sequelize";
import db from '.'
import sequelize from "sequelize";
import { Lesson as LessonT } from "../../types";
import Tutor from "./Tutors";
import Student from "./Students";
import { LessonMinutes, LessonStatuses } from "../../enums";

class Lesson extends Model {
    declare id: LessonT['id']
    declare scheduled_at: LessonT['scheduled_at']
    declare duration_minutos: LessonT['duration_minutos']
    declare status: LessonT['status']
    declare student_id: Student['id']
    declare tutor_id: Tutor['id']
}

Lesson.init(
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        scheduled_at: {
            type: sequelize.DATE,
            allowNull: false
        },
        duration_minutos: {
            type: sequelize.TINYINT,
            allowNull: false
        },
        status: {
            type: sequelize.STRING,
            allowNull: false,
            defaultValue: 'Unscheduled'
        },
        student_id: {
            type: sequelize.UUID,
            allowNull: false,
            references: {
                model: 'students',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        tutor_id: {
            type: sequelize.UUID,
            allowNull: false,
            references: {
                model: 'tutors',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        sequelize: db,
        tableName: 'lessons',
        timestamps: true
    }
)


export default Lesson