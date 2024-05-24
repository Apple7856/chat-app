import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./App.scss";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

function App() {
  const [userData, setUserData] = useState("");

  const [selectData, setSelectData] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("res");
    if (JSON.parse(data)) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: userData ? <Home /> : <Navigate to="/sign-in" />,
    },
    {
      path: "/sign-in",
      element: userData ? <Navigate to="/" /> : <SignIn />,
    },
    {
      path: "/sign-up",
      element: userData ? <Navigate to="/" /> : <SignUp />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        selectData,
        setSelectData,
      }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
