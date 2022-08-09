const Task = require('../models/task')
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async(req, res) => { 
    const tasks = await Task.find({})
    return res.status(200).json({ success: true, data: tasks })
})

const createTask = asyncWrapper (async (req, res) => {
    const { name } = req.body
    if (!name) return res.status(400).json({ success: false, message: "Name cannot be empty" })
   const task = await Task.create(req.body)
     return res.status(201).json({success: true, data: task });
    
})

const getSingleTask = asyncWrapper(async (req, res, next) => {
    const {id:taskId} = req.params
  const task = await Task.findOne({ _id: taskId })
  
   task
     ? res.status(200).json({ success: true, data: task })
     : next(createCustomError(`No task with Id: '${taskId}' found`, 404));
});

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true
    })
    task
      ? res.status(200).json({ success: true, data: task })
      : next(createCustomError(`No task with Id: '${taskId}' found`, 404));
})

const deleteTask = asyncWrapper(async (req, res) => {
   const { id: taskId } = req.params
    const task = await Task.findOneAndDelete({ _id: taskId })
   task
     ? res.status(200).json({ success: true, message: task })
     : next(createCustomError(`No task with Id: '${taskId}' found`, 404));
});


module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};

