import { Model } from "sequelize";
import db from '.'
import sequelize from "sequelize";
import { UUUID } from "../../types";
import Tutor from "./Tutors";
import Student from "./Students";

class CustomPrice extends Model {
    declare id: UUUID
    declare price: number
    declare student_id: Student['id']
    declare tutor_id: Tutor['id']
}

CustomPrice.init(
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        price: {
            type: sequelize.DECIMAL(4, 2),
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
        tableName: 'custom_prices',
        timestamps: false
    }
)


export default CustomPrice