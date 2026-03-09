import express from 'express';
let router = express.Router();

import teacherService from "../services/TeacherService.js";

// create
router.post('/addTeacher', async (req, res) => {
    try {
        const teacher = await teacherService.saveTeacher(req.body);
        res.status(201).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// retrieve all
router.get('/getAllTeachers', async (req, res) => {
    try {
        const teachers = await teacherService.getAllTeachers();
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// retrieve single
router.get('/teacher/:id', async (req, res) => {
    try {
        const teacher = await teacherService.getTeacherById(req.params.id);
        if (teacher) {
            res.status(200).json(teacher);
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// update
router.put('/updateTeacher/:id', async (req, res) => {
    try {
        const result = await teacherService.updateTeacherById(req.params.id, req.body);
        if (result.status === 404) {
            res.status(404).json(result);
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// delete
router.delete('/deleteTeacher/:id', async (req, res) => {
    try {
        await teacherService.deleteTeacherById(req.params.id);
        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;