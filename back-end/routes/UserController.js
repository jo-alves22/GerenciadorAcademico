import express from 'express';
let router = express.Router();

import userService from "../services/UserService.js";

// create
router.post("/addUser", async function (req, res) {
    const userModel = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender
    };

    try {
        const user = await userService.saveUser(userModel);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// read all
router.get("/getAllUsers", async function (req, res) {
    try {
        const allUsers = await userService.getAllUsers();
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// read single
router.get("/user/:id", async function (req, res) {
    try {
        const user = await userService.getUserById(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// delete
router.get("/deleteUser/:id", async function (req, res) {
    try {
        const user = await userService.deleteUserById(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// update
router.put("/updateUser/:id", async function (req, res) {
    const userModel = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender
    };

    try {
        const user = await userService.updateUserById(req.params.id, userModel);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;