import { createBrowserRouter } from "react-router-dom";
import { Chat } from "../pages/Chat";
import { Home } from "../pages/Home";
import { Layout } from "../pages/Layou";

export const Router = createBrowserRouter ([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "/",
                element: <Home />,
                index: true,
            },
            {
                path: "/chat",
                element: <Chat />,
            },
        ]
    }
])