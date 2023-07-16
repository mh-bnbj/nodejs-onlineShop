const { DataTypes } = require('sequelize')
const db = require('../configs/db')
const bcrypt = require('bcrypt')

const User = db.define(
    'user',
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        admin: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            defaultValue: '-',
        },
        token_used: {
            type: DataTypes.NUMBER,
            defaultValue: 0,
        },
    },
    {
        tableName: 'user',
        timestamps: false,
    }
)

User.validPassword = (user, pwd) => {
    return bcrypt.compareSync(pwd, user.password)
}

User.encryptPassword = async (myPlainTextPassword) => {
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10
    const salt = await bcrypt.genSaltSync(saltRounds)
    const hash = await bcrypt.hashSync(myPlainTextPassword, salt)
    return hash
}

module.exports = User
