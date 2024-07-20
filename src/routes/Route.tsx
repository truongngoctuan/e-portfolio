import { Home } from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";

export const AppRouter: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <div>This is About page</div>,
        },
        {
          path: "/articles",
          element: <div>This is Articles page</div>,
        },
        {
          path: "/plays",
          element: <div>This is Plays page</div>,
        },
      ],
    },
  ]);
