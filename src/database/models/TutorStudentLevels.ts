import { Model } from "sequelize";
import db from '.'
import sequelize from "sequelize";
import Tutor from "./Tutors";
import StudentLevels from "./StudentLevels";

class TutorStudentLevels extends Model {
    declare student_level_id: StudentLevels['id']
    declare tutor_id: Tutor['id']
}

TutorStudentLevels.init(
    {
        tutor_id: {
            type: sequelize.UUID,
            allowNull: false,
            references: {
                model: Tutor,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        student_level_id: {
            type: sequelize.INTEGER,
            allowNull: false,
            references: {
                model: StudentLevels,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        sequelize: db,
        tableName: 'tutor_student_levels',
        timestamps: false
    }
)
Tutor.belongsToMany(StudentLevels, {through: TutorStudentLevels, foreignKey: 'tutor_id', otherKey: 'student_level_id' })
StudentLevels.belongsToMany(Tutor, {through: TutorStudentLevels, foreignKey: 'student_level_id', otherKey: 'tutor_id' })

export default TutorStudentLevels