import express from 'express';
let router = express.Router();

import userController from './userController.js';
import courseController from './courseController.js';
import teacherController from './teacherController.js';
import evaluationController from './evaluationController.js';

router.get("/", function(req, res) {
    console.log("oi");
    res.status(200).json({message: "Sucesso!"});
});

router.use("/", userController);
router.use("/", courseController);
router.use("/", teacherController);
router.use("/", evaluationController);

export default router;

