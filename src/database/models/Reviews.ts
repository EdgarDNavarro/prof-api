import { Model } from "sequelize";
import db from '.'
import sequelize from "sequelize";
import { UUUID } from "../../types";
import Tutor from "./Tutors";
import Student from "./Students";
import { Review as ReviewT } from "../../types"

class Review extends Model {
    declare id: ReviewT['id']
    declare rating: ReviewT['rating']
    declare comment: ReviewT['comment']
    declare student_id: Student['id']
    declare tutor_id: Tutor['id']
}

Review.init(
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        rating: {
            type: sequelize.TINYINT,
            allowNull: false
        },
        comment: {
            type: sequelize.TEXT,
            allowNull: false
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
        tableName: 'reviews',
        timestamps: true
    }
)


export default Review