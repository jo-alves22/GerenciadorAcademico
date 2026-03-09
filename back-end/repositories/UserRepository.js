import User from '../models/User.js';


const saveUser = async (user) => {
    // userModel variable was not defined originally, use the passed-in object
    const save = await User.create(user);
    return save;
}

const getAllUsers = async () => {
    return await User.findAll({
        order: [
            ['id', 'ASC']
        ]}
    );
}

const getUserById = async (id) => {
    // Sequelize v6 uses findByPk for primary key lookups
    return await User.findByPk(id);
}

const deleteUserById = async (id) => {
    return await User.destroy({ where: { id: id} });
}

const updateUserById = async (id, user) => {
    try {
        const result = await User.update(user, { where: { id: id}});
        if (result[0] === 1) {
            return { message: "user updated sucessfully" };
        } else {
            return { message: `could not find user with id ${id} to update`, status: 404 };
        }
    } catch (error) {
        console.error();
    }
};


const factory = {
    saveUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById
}

export default factory;