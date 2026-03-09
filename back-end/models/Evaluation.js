import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";

const Evaluation = sequelize.define('evaluations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    concept:  {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { 
    tableName: 'Evaluations',
    underscored: true 
});

export default Evaluation;