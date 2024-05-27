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
import newRequest from "./utils/newRequest";

export const UserContext = createContext();

function App() {
  const [userData, setUserData] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [selectData, setSelectData] = useState({});

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    setAccessToken(token);
    if (token) {
      async function loginUserData() {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await newRequest.get("/users/login-user", config);
          setUserData(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      loginUserData();
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
        accessToken,
        setAccessToken,
      }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
