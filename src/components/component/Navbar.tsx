import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md mt-11">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-white text-xl font-bold">Task Manager</div>
        <div className="space-x-4">
          <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Add Task
          </Link>
          <Link
            to="/tasks"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
          >
            All Tasks
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
