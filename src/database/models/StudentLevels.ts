import { Model } from "sequelize";
import db from '.'
import sequelize from "sequelize";
import { UUUID } from "../../types";
import { StudentLevel } from "../../enums";

class StudentLevels extends Model {
    declare id: number
    declare student_level: StudentLevel
}

StudentLevels.init(
    {
        id: {
            type: sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        student_level: {
            type: sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize: db,
        tableName: 'student_levels',
        timestamps: false
    }
)


export default StudentLevels