import express from 'express';
import userService from "../services/UserService.js";
import multer from 'multer';
import process from 'process';
import { profile } from 'console';

let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './images');
    },
    filename: function (req, file, callback) {
        callback(null, req.body.first_name + '_' + req.body. last_name + '_' + Date.now() + '_' + file.originalname);
    }
});
const upload = multer({ storage: storage }).single('file');
// create
router.post("/addUser", async function (req, res) {

    upload(req, res, async function (err){
        const userModel = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            profile_picture: req.file.path
        };
    
        try {
            const user = await userService.saveUser(userModel);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    );

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
    upload(req, res, async function (err){
        const userModel = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            profile_picture: req.file.path
        };

        try {
            const user = await userService.updateUserById(req.params.id, userModel);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
});

router.get("/userImage/:id", async function (req, res) {
    const user = await userService.getUserById(req.params.id);
    res.sendFile(process.cwd() + '\\' + user.profile_picture);
});

export default router;