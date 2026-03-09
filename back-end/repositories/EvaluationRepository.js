import Evaluation from '../models/Evaluation.js';

const saveEvaluation = async (evaluation) => {
    const save = await Evaluation.create(evaluation);
    return save;
}

const getAllEvaluations = async () => {
    return await Evaluation.findAll({
        order: [['id', 'ASC']]
    });
}

const getEvaluationById = async (id) => {
    return await Evaluation.findByPk(id);
}

const deleteEvaluationById = async (id) => {
    return await Evaluation.destroy({ where: { id: id } });
}

const updateEvaluationById = async (id, evaluation) => {
    try {
        const result = await Evaluation.update(evaluation, { where: { id: id } });
        if (result[0] === 1) {
            return { message: "evaluation updated successfully" };
        } else {
            return { message: `could not find evaluation with id ${id} to update`, status: 404 };
        }
    } catch (error) {
        console.error('Error updating evaluation:', error);
        throw error;
    }
};

const factory = {
    saveEvaluation,
    getAllEvaluations,
    getEvaluationById,
    deleteEvaluationById,
    updateEvaluationById
}

export default factory;