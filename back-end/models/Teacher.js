import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";

const Teacher = sequelize.define('teachers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name:  {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { underscored: true });

export default Teacher;