import { useMemo } from "react";

const TaskList = ({tasks, onDelete, onEdit, onToggleComplete}) => {

  const { incompleteTasks, completedTasks } = useMemo(() => {
    if (!Array.isArray(tasks)) {
      return { incompleteTasks: [], completedTasks: [] };
    }
    return {
      incompleteTasks: tasks.filter(task => !task.completed),
      completedTasks: tasks.filter(task => task.completed)
    };
  }, [tasks]);

  if (!Array.isArray(tasks)) {
    return <div>No tasks available.</div>; 
  }
  
 
  return (

    <div className="max-w-4xl mx-auto p-6 mt-20">
    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Tasks</h1>
    <div className="grid md:grid-cols-2 gap-24">
      <div className="bg-white/90 rounded-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pending Tasks</h2>
        {incompleteTasks.length != 0 ? incompleteTasks.map((task) => (
           <div key={task.description} 
           className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 mb-4 break-words">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
          <span className="text-sm text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
        
        <p className="text-gray-600 mb-6">{task.description}</p>
        
        <div className="space-y-4">
          <button
            onClick={() => onEdit(task)}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Edit
          </button>
          
          <div className="flex justify-between space-x-4">
            <button 
              onClick={() => onToggleComplete(task._id, !task.completed)}
              className="w-full px-4 py-2 rounded-md text-white font-medium bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              Mark Complete
            </button>
            <button 
              onClick={() => onDelete(task._id)}
              className="w-full px-4 py-2 rounded-md text-white font-medium bg-red-500 hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
        )): <p>No Incomplete Tasks</p>}
      </div>

      <div className="bg-white/90 rounded-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Completed Tasks</h2>
        {completedTasks.length != 0?  completedTasks.map((task) => (
          <div key={task.description} 
               className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 mb-4">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
              <div className="flex gap-4">
              <span className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">{task.description}</p>
            
            <div className="flex justify-end space-x-4">
              <button 
                className="px-4 py-2 rounded-md text-white font-medium bg-green-500 hover:bg-green-600 transition-colors"
                disabled
              >
                Completed
              </button>
              <button 
                onClick={() => onDelete(task._id)}
                className="px-4 py-2 rounded-md text-white font-medium bg-red-500 hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )) : <p>No completed Tasks</p>}
      </div>
    </div>
  </div>
  );
 };

export default TaskList;