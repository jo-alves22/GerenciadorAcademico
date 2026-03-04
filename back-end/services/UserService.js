import userRepository from '../repositories/UserRepository.js';

const saveUser = (userModel) => {
    return userRepository.saveUser(userModel);
}

const getUserById = (id) => {
    return userRepository.getUserById(id);
}

const getAllUser = () => {
    return userRepository.getAllUsers();
}

const deleteUserById = (id) => {
    return userRepository.deleteUserById(id);
}

const updateUserById = (id, userModel) => {
    return userRepository.updateUserById(id, userModel);
}

const service = {
    saveUser,
    getUserById,
    getAllUser,
    deleteUserById,
    updateUserById
}

export default service;