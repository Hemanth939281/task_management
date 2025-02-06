"use server"

import connectDB from "./mongodb";
import Taskmodel from "@/models/Task";

export const getTasks = async () => {
    await connectDB();
    return Taskmodel.find();
}

export const createTask = async (task) => {
    await connectDB();
    const newTask = new Taskmodel(task);
    newTask.save();
}

export const updateTask = async (id, updatedTask) => {
    await connectDB();
    await Taskmodel.findByIdAndUpdate(id, updatedTask, {new: true});
}

export const deleteTask = async(id) => {
    await connectDB();
    await findByIdAndDelete(id);
}