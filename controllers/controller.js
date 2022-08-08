const Task = require('../models/task')

const getAllTasks = async(req, res) => { 
    const tasks = await Task.find({}).catch((err) => {
      return res
        .status(500)
        .json({ success: false, message: err.errors.name.message });
    });
    return res.status(200).json({ success: true, data: tasks })
}

const createTask = async (req, res) => {``
   const task = await Task.create(req.body)
       .catch((err) => {
           return res.status(500).json({ success: false, message: err.errors.name.message })
       })
     return res.status(201).json({success: true, data: task });
    
}

const getSingleTask = async (req, res) => {
    const {id:taskId} = req.params
   const task = await Task.findOne({ _id: taskId }).catch((err) => {
     return res.status(500).json({ success: false, message: err.message });
   });
   task
     ? res.status(200).json({ success: true, data: task })
     : res
         .status(404)
         .json({ success: false, message: `No task with Id: '${taskId}' found` });
};

const updateTask = async (req, res) => {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true
    }).catch(
      (err) => {
        return res.status(500).json({ success: false, message: err.message });
      }
    );
    task
      ? res.status(200).json({ success: true, data: task })
      : res
          .status(404)
          .json({
            success: false,
            message: `No task with Id: '${taskId}' found`,
          });
}

const deleteTask = async (req, res) => {
   const { id: taskId } = req.params
    const task = await Task.findOneAndDelete({ _id: taskId }).catch((err) => {
     return res.status(500).json({ success: false, message: err.message });
   });
   task
     ? res.status(200).json({ success: true, message: task })
     : res
         .status(404)
         .json({ success: false, message: `No task with Id: '${taskId}' found` });
};


module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};

