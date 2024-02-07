const Task = require('../model/task')

const createTask = async (req,res) => {

    try {
        const task = await Task.create(req.body);
        res.status(201).json({msg: "Task created successfully!",task });
    } catch (error) {
        res.status(500).json({msg: error})
    } 
}

const getAlltasks = async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({msg: error})
    }
}


const getTask = async (req,res) => {
    try {
        const id = req.params.id;
        const singleTask = await Task.findById(id) 
        if(!singleTask)
        {
            return res.status(404).json({msg: `No task with id ${id}`})
        }
        res.status(200).json({singleTask})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const updateTask = async(req,res) => {
    try {
        const task = await Task.findByIdAndUpdate({_id: req.params.id},req.body,{ //Third property 'options' in mongoose.
            new: true ,    //new - returns the modified document
            runValidators: true    //validate the update operation against the model's schema
 
        });
        if(!task)
        {
            return res.status(404).json({msg: `No task with id ${id}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const deleteTask = async (req,res) => {
    try {
        const id = req.params.id;
        const deleteTask = await Task.findByIdAndDelete(id)
        if(!deleteTask){
            return res.status(404).json({msg: `No task with id ${id}`});
        }
        res.status(200).json({deleteTask})
    } catch (error) {
        res.status(500).json({msg: error});
    }
}


module.exports = {getAlltasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}