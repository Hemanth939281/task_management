
const TaskList = ({tasks, onDelete, onEdit, onToggleComplete}) => {
 
  if (!Array.isArray(tasks)) {
    return <div>No tasks available.</div>; 
  }
 
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Tasks</h1>
      <div className="grid gap-6">
        {tasks?.map((task) => (
          <div key={task.description} 
               className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
              <div className="flex gap-4">
              <span className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>

              {/* Update Button */}
            <button
              onClick={() => onEdit(task)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Edit
            </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">{task.description}</p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => onToggleComplete(task._id, !task.completed)}
                className={`px-4 py-2 rounded-md text-white font-medium transition-colors
                  ${task.completed 
                    ? "bg-green-500 hover:bg-green-600" 
                    : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                {task.completed ? "Completed" : "Mark Complete"}
              </button>
              {/* Delete Button  */}
              <button 
                onClick={() => onDelete(task._id)}
                className="px-4 py-2 rounded-md text-white font-medium bg-red-500 hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
 };

export default TaskList;