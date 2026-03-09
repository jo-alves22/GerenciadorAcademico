import express from 'express';
let router = express.Router();

import courseService from "../services/CourseService.js";

router.post('/addCourse', async (req, res) => {
    try {
        const course = await courseService.saveCourse(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/course/:id', async (req, res) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/courses', async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/updateCourse/:id', async (req, res) => {
    try {
        const result = await courseService.updateCourseById(req.params.id, req.body);
        if (result.status === 404) {
            res.status(404).json(result);
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/deleteCourse/:id', async (req, res) => {
    try {
        await courseService.deleteCourseById(req.params.id);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;