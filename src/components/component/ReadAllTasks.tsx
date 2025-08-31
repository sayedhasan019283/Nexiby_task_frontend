import React, { useState, useEffect } from "react";
import axios from "axios";

const ReadAllTasks = () => {
  // State variables to hold the task data, loading, and error state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/task/read");

        // Check if the response is successful and data structure is correct
        if (response.data.code === 200) {
          setTasks(response.data.data.attributes); // Save tasks in state
        } else {
          setError("Failed to fetch tasks.");
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError("Error fetching tasks: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Function to toggle task status (from "pending" to "completed" and vice versa)
  const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
  const newStatus = currentStatus === "pending" ? "completed" : "pending"; // Toggle status

  try {
    // Send taskId as URL parameter and status as payload
    const response = await axios.patch(
      `http://localhost:8080/api/v1/task/update/${taskId}`, // taskId as URL parameter
      { status: newStatus } // Send the status in the request payload
    );

    if (response.data.code === 200) {
      // Update the task status locally after successful API call
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } else {
      setError("Failed to update task status.");
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    setError("Error updating task status: " + error.message);
  }
};


  // Handle loading, error, and displaying tasks
  if (loading) {
    return <div className="text-center text-gray-600">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
  <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
  <div className="w-full max-w-4xl p-6 sm:p-8 md:p-10 bg-white rounded-xl shadow-lg space-y-6">
    <h2 className="text-3xl font-semibold text-center text-gray-800">All Tasks</h2>

    {tasks.length === 0 ? (
      <div className="text-center text-gray-600">No tasks available.</div>
    ) : (
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`p-4 border rounded-md ${task.status === "completed" ? "bg-green-100" : "bg-yellow-100"} flex justify-between items-center`}
          >
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">Status: {task.status}</p>
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => toggleTaskStatus(task._id, task.status)}
              className={`w-16 h-8 flex items-center rounded-full p-1 transition-all duration-300 
                ${task.status === "completed" ? "bg-green-500" : "bg-gray-400"}`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                  task.status === "completed" ? "translate-x-8" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
};

export default ReadAllTasks;
