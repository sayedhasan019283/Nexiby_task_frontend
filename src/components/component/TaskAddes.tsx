import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TaskAddes = () => {
  // State to manage the title input value
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
    const navigate = useNavigate()
  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setMessage("Title is required!");
      return;
    }

    // Prepare payload with static status
    const payload = {
      title: title,
      status: "pending", // static status
    };

    setIsLoading(true);

    try {
      // Send the payload to your backend using Axios
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post("http://localhost:8080/api/v1/task/create", payload);
      setMessage("Task created successfully!");
      setTitle(""); 
        navigate('/tasks')
    } catch (error) {
      setMessage("Error creating task, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
  <div className="w-full max-w-4xl p-6 sm:p-8 md:p-10 bg-white rounded-xl shadow-lg space-y-6">
    <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
      Add New Task
    </h2>

    {message && (
      <div className={`text-center mb-4 ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
        {message}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 p-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task title"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-lg focus:outline-none ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Add Task"}
        </button>
      </div>
    </form>
  </div>
</div>


  );
};

export default TaskAddes;
