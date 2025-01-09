import { Model } from "sequelize";
import db from '.'
import sequelize from "sequelize";
import bcrypt from 'bcrypt'
import Student from "./Students";
import Tutor from "./Tutors";
import { User as UserT } from "../../types";

class User extends Model {
    declare id: UserT['id']
    declare email: UserT['email']
    declare password: UserT['password']
    declare token: UserT['token']
    declare confirmed: UserT['confirmed']
    declare language: UserT['language']
    declare currency: UserT['currency']
    declare Tutor?: Tutor
    declare Student?: Student

    async verifyPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize.STRING,
            allowNull: false
        },
        token: {
            type: sequelize.STRING,
            allowNull: true
        },
        confirmed: {
            type: sequelize.BOOLEAN,
            defaultValue: false
        },
        language: {
            type: sequelize.STRING,
            allowNull: false
        },
        currency: {
            type: sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize: db,
        tableName: 'users',
        timestamps: false,
        hooks: {
            beforeCreate: async function (user: User) {
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(user.password, salt)
            }
        }
    }
)

User.hasOne(Student, { foreignKey: 'user_id' })
Student.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Tutor, { foreignKey: 'user_id' })
Tutor.belongsTo(User, { foreignKey: 'user_id' });
export default User