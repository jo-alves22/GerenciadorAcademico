import express from 'express';
let router = express.Router();

import evaluationService from "../services/EvaluationService.js";

// create
router.post('/addEvaluation', async (req, res) => {
    try {
        const evaluation = await evaluationService.saveEvaluation(req.body);
        res.status(201).json(evaluation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// retrieve all
router.get('/getAllEvaluations', async (req, res) => {
    try {
        const list = await evaluationService.getAllEvaluations();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// retrieve single
router.get('/evaluation/:id', async (req, res) => {
    try {
        const ev = await evaluationService.getEvaluationById(req.params.id);
        if (ev) {
            res.status(200).json(ev);
        } else {
            res.status(404).json({ message: 'Evaluation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// update
router.put('/updateEvaluation/:id', async (req, res) => {
    try {
        const result = await evaluationService.updateEvaluationById(req.params.id, req.body);
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
router.delete('/deleteEvaluation/:id', async (req, res) => {
    try {
        await evaluationService.deleteEvaluationById(req.params.id);
        res.status(200).json({ message: 'Evaluation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;