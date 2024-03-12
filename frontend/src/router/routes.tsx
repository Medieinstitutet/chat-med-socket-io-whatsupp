import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homePage";
import ErrorPage from "../pages/errorPage";
import ChatPage from "../pages/chatPage";
import RoomPage from "../pages/RoomPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
        index: true,
      },
      {
        path: "/room",
        element: <RoomPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
    ],
  },
]);
