import mongoose from "mongoose";

// Task Schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true},
  description: String,
  dueDate: Date,
  completed: { type: Boolean, default: false }
}, {
  timestamps: true 
});


const TaskModel = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default TaskModel;