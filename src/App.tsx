import "./styles/index.scss";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/config";
import { UserContextProviderFirebase } from "./context/UserContextProvider";
import { Outlet } from "react-router-dom";
import React from "react";

initializeApp(firebaseConfig);

function App() {
  console.log('App renderizado');
  return (
    <>
    <UserContextProviderFirebase>
      <Outlet />
    </UserContextProviderFirebase>
    </>
  );
}

export default App;
