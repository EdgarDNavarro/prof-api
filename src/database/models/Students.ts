import { Model } from "sequelize";
import db from '.'
import sequelize from "sequelize";
import { User, Student as StudentT } from "../../types";
import Lesson from "./Lessons";

class Student extends Model {
    declare id: StudentT['id']
    declare first_name: StudentT['first_name']
    declare last_name: StudentT['last_name']
    declare phone_number?: StudentT['phone_number']
    declare timezone: StudentT['timezone']
    declare photo?: StudentT['photo']
    declare user_id: User['id']
}

Student.init(
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: sequelize.STRING,
            allowNull: false
        },
        phone_number: {
            type: sequelize.STRING,
            allowNull: true
        },
        timezone: {
            type: sequelize.STRING,
            defaultValue: false
        },
        photo: {
            type: sequelize.STRING,
            allowNull: true
        },
        user_id: {
            type: sequelize.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        sequelize: db,
        tableName: 'students',
        timestamps: false
    }
)
Student.hasOne(Lesson, {foreignKey: 'student_id'})
Lesson.belongsTo(Student, { foreignKey: 'student_id' });

export default Student