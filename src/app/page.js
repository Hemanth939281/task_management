"use client"


import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    const response = await axios.get("/api/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (taskData) => {
    if (selectedTask) {
      await axios.put(`/api/tasks/${selectedTask._id}`, taskData);
    } else {
      await axios.post("/api/tasks", taskData);
    }
    setSelectedTask(null);
    fetchTasks();
  };

  const handleDelete = async (taskId) => {
    await axios.delete(`/api/tasks/${taskId}`);
    const updatedTasks = tasks.filter((task) => task._id!== taskId);
    setTasks(updatedTasks);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  const handleToggleComplete = async(taskId, completed) =>{
    await axios.put(`/api/tasks/${taskId}`, {completed});
    fetchTasks();
  }
  

  return (
    <>
    <TaskForm task={selectedTask}  onSubmit={handleSubmit}/>
    <TaskList 
    tasks = {tasks}
    onDelete={handleDelete}
    onEdit={handleEdit}
    onToggleComplete={handleToggleComplete}

    />
  </>
  );
}
