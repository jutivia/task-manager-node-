const express= require('express');
const router= express.Router();
const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').delete(deleteTask).get(getTask).patch(updateTask)

module.exports= router;
