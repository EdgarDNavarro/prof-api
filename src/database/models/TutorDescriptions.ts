import { Model } from "sequelize";
import db from '.'
import sequelize from "sequelize";
import { TutorDescriptions as TutorDescriptionsT } from "../../types";

class TutorDescriptions extends Model {
    declare id: TutorDescriptionsT['id']
    declare type: TutorDescriptionsT['type']
    declare content: TutorDescriptionsT['content']
    declare tutor_id: TutorDescriptionsT['tutor_id']
}

TutorDescriptions.init(
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: sequelize.STRING,
            allowNull: false
        },
        content: {
            type: sequelize.TEXT,
            allowNull: false
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
        tableName: 'tutor_descriptions',
        timestamps: false
    }
)


export default TutorDescriptions