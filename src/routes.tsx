import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Patterns from "./components/patterns";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/patterns",
        element: <Patterns />,
      },
    ],
  },
]);
