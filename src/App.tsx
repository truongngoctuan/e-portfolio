// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

import { AppRouter } from "./routes/Route";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={AppRouter} />;
}

export default App;
