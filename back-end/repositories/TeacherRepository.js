import Teacher from '../models/Teacher.js';



const saveTeacher = async (teacher) => {
    const save = await Teacher.create(teacher);
    return save;
}

const getAllTeachers = async () => {
    return await Teacher.findAll({
        order: [
            ['id', 'ASC']
        ]}
    );
}

const getTeacherById = async (id) => {
    return await Teacher.findByPk(id);
}

const deleteTeacherById = async (id) => {
    return await Teacher.destroy({ where: { id: id} });
}

const updateTeacherById = async (id, teacher) => {
    try {
        const result = await Teacher.update(teacher, { where: { id: id}});
        if (result[0] === 1) {
            return { message: "teacher updated sucessfully" };
        } else {
            return { message: `could not find teacher with id ${id} to update`, status: 404 };
        }
    } catch (error) {
        console.error(error);
    }
};


const factory = {
    saveTeacher,
    getAllTeachers,
    getTeacherById,
    deleteTeacherById,
    updateTeacherById
}

export default factory;