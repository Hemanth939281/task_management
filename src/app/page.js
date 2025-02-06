"use client"


import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
      toast.success('task updated sucessfully');
      setSelectedTask(null);
      fetchTasks();
    } else {
      try{
         await axios.post("/api/tasks", taskData);
         toast.success('task added successfully');
      }
      catch(error){
        toast.error(error.response.data.message);
      }
      
      fetchTasks();
    }
    setSelectedTask(null);
    fetchTasks();
  };

  const handleDelete = async (taskId) => {
    await axios.delete(`/api/tasks/${taskId}`);
    toast.success('task deleted successfully');
    const updatedTasks = tasks.filter((task) => task._id!== taskId);
    setTasks(updatedTasks);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleComplete = async(taskId, completed) =>{
    await axios.put(`/api/tasks/${taskId}`, {completed});
    toast.success('task marked as completed');
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
