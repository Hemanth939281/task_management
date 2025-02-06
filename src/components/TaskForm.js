"use client"

import { useState, useRef, useEffect } from "react";

const TaskForm = ({task, onSubmit}) => {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();
    const [errors, setErrors] = useState({})

    useEffect(() => {
      if (task) {
        titleRef.current.value = task.title;
        descriptionRef.current.value = task.description;
        dueDateRef.current.value = task.dueDate ? task.dueDate.split("T")[0] : "";
      } else {
        titleRef.current.value = "";
        descriptionRef.current.value = "";
        dueDateRef.current.value = "";
      }
    }, [task]);

    const validate = () => {
        const newErrors={}

        if (!titleRef.current.value) return newErrors.title = "Task title is required";
        if (!descriptionRef.current.value) return newErrors.description = "Task description is required";
        if (!dueDateRef.current.value) return newErrors.dueDate = "Task due date is required";
        setErrors(newErrors);

        return Object.keys(errors).length === 0;
    }
    const handleTaskSubmission = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const task = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            dueDate: dueDateRef.current.value
        }
        console.log(task);
        onSubmit(task);

    titleRef.current.value = "";
    descriptionRef.current.value = "";
    dueDateRef.current.value = "";
        
    }

    return (
        <>
        <div className="bg-gray-200 py-16">
        <div className="text-center my-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Management App</h1>
        <p className="text-gray-600">Organize and track your tasks efficiently</p>
      </div>
        <form 
    className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6 mt-6"
    onSubmit={handleTaskSubmission}
  >
    <h2 className="text-2xl font-bold text-gray-800 mb-6">{task ? "Update Task" : "Create New Task"}</h2>
    
    <div className="space-y-2">
      <label 
        htmlFor="task-title" 
        className="text-sm font-medium text-gray-700 block"
      >
        Task Title
      </label>
      <input
        type="text"
        id="task-title"
        name="task-title"
        ref={titleRef}
        placeholder="Enter task title"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
      />
      {errors.title && (
        <p className="text-sm text-red-500 mt-1">{errors.title}</p>
      )}
    </div>

    <div className="space-y-2">
      <label 
        htmlFor="task-description" 
        className="text-sm font-medium text-gray-700 block"
      >
        Task Description
      </label>
      <input
        type="text"
        id="task-description"
        name="task-description"
        ref={descriptionRef}
        placeholder="Enter task description"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
      />
      {errors.description && (
        <p className="text-sm text-red-500 mt-1">{errors.description}</p>
      )}
    </div>

    <div className="space-y-2">
      <label 
        htmlFor="task-dueDate" 
        className="text-sm font-medium text-gray-700 block"
      >
        Due Date
      </label>
      <div className="relative">
        <input
          type="date"
          id="task-dueDate"
          name="task-dueDate"
          ref={dueDateRef}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        />
      </div>
      {errors.dueDate && (
        <p className="text-sm text-red-500 mt-1">{errors.dueDate}</p>
      )}
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium transition-colors"
    >
      {task ? "Update" : "Add Task"}
    </button>
  </form>
        </div>
        </>
    )
}

export default TaskForm;