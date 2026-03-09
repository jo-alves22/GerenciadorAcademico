import Course from '../models/Course.js';


const saveCourse = async (course) => {
    const save = await Course.create(course);
    return save;
}

const getAllCourses = async () => {
    return await Course.findAll({
        order: [
            ['id', 'ASC']
        ]}
    );
}

const getCourseById = async (id) => {
    return await Course.findByPk(id);
}

const deleteCourseById = async (id) => {
    return await Course.destroy({ where: { id: id} });
}

const updateCourseById = async (id, course) => {
    try {
        const result = await Course.update(course, { where: { id: id}});
        if (result[0] === 1) {
            return { message: "course updated successfully" };
        } else {
            return { message: `could not find course with id ${id} to update`, status: 404 };
        }
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }
};


const factory = {
    saveCourse,
    getAllCourses,
    getCourseById,
    deleteCourseById,
    updateCourseById
}

export default factory;