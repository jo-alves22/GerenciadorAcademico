import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";

const Course = sequelize.define('Courses', {
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
}, { 
    tableName: 'Courses',
    underscored: true 
});

export default Course;