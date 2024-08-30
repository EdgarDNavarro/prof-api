import { Model } from "sequelize";
import db from '.'
import sequelize from "sequelize";
import { User, UUUID } from "../../types";
import Lesson from "./Lessons";
import Review from "./Reviews";
import TutorDescriptions from "./TutorDescriptions";
import CustomPrice from "./CustomPrices";
//TODO agregar campo fee para el porcentaje
class Tutor extends Model {
    declare id: UUUID
    declare first_name: string
    declare last_name: string
    declare phone_number?: string
    declare timezone: string
    declare photo?: string
    declare bio?: string
    declare rating: number 
    declare country_of_birth: string 
    declare video_link?: string
    declare video_thumbnail?: string
    declare years_of_experience: number
    declare class_price: number
    declare balance: number
    declare profile_verified: boolean
    declare profile_hidden: boolean
    declare total_hours: number
    declare total_lessons: number
    declare super_tutor_badge: boolean
    declare user_id: User['id']
}

Tutor.init(
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
            allowNull: false
        },
        photo: {
            type: sequelize.STRING,
            allowNull: true
        },
        bio: {
            type: sequelize.STRING,
            allowNull: true
        },
        rating: {
            type: sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        country_of_birth: {
            type: sequelize.STRING,
            allowNull: false
        },
        video_link: {
            type: sequelize.STRING,
            allowNull: true
        },
        video_thumbnail: {
            type: sequelize.STRING,
            allowNull: true
        },
        years_of_experience: {
            type: sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        class_price: {
            type: sequelize.FLOAT,
            allowNull: false,
            defaultValue: 5
        },
        balance: {
            type: sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        profile_verified: {
            type: sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        profile_hidden: {
            type: sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        total_hours: {
            type: sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        total_lessons: {
            type: sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        super_tutor_badge: {
            type: sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
        tableName: 'tutors',
        timestamps: false
    }
)

Tutor.hasMany(Lesson, {foreignKey: 'tutor_id'})
Lesson.belongsTo(Tutor, { foreignKey: 'tutor_id' });

Tutor.hasMany(Review, {foreignKey: 'tutor_id'})
Review.belongsTo(Tutor, { foreignKey: 'tutor_id' });

Tutor.hasMany(TutorDescriptions, {foreignKey: 'tutor_id'})
TutorDescriptions.belongsTo(Tutor, { foreignKey: 'tutor_id' });

Tutor.hasMany(CustomPrice, {foreignKey: 'tutor_id'})
CustomPrice.belongsTo(Tutor, { foreignKey: 'tutor_id' });

export default Tutor