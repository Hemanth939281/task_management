import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: String,
    dueDate : Date,
    completed: {type: Boolean, default: false}
});

const Taskmodel = mongoose.model('taskModel', taskSchema);
export default Taskmodel;