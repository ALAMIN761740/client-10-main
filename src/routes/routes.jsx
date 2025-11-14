import React from "react";

import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFoundPage from "../pages/NotFoundPage";
import MyProfile from "../pages/MyProfile";
import Logout from "../pages/auth/Logout";

import AddTask from "../pages/AddTask";
import BrowseTasks from "../pages/BrowseTasks";
import TaskDetails from "../pages/TaskDetails";
import MyTasks from "../pages/MyTasks";
import UpdateTask from "../pages/UpdateTask";

import PrivateRoute from "../routes/PrivateRoute";

const allRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },

      { path: "/login", element: <Login /> },
      { path: "/logout", element: <Logout /> },

      { path: "/signup", element: <Register /> },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },

      {
        path: "/my-tasks",
        element: (
          <PrivateRoute>
            <MyTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "/tasks/:id",
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-task",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-task/:id",
        element: (
          <PrivateRoute>
            <UpdateTask />
          </PrivateRoute>
        ),
      },

      // Browse routes
      { path: "/browse-tasks", element: <BrowseTasks /> },
      { path: "/browse-tasks/:category", element: <BrowseTasks /> },
      { path: "/task-details/:id", element: <TaskDetails /> },
      { path: "/update-task/:id", element: <UpdateTask /> }

    ],
  },
  { path: "*", element: <NotFoundPage /> },
];

export default allRoutes;
