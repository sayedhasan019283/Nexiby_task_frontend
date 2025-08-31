import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TaskAddes from "../components/component/TaskAddes";
import ReadAllTasks from "../components/component/ReadAllTasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <TaskAddes />,
      },
      {
        path: "tasks",
        element: <ReadAllTasks />,
      },
    ],
  },
]);

export default router;
