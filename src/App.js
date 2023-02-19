import React from "react";
import './App.css';
import Registration from "./Components/Auth/Registration";
import {Route, Routes} from "react-router";
import Login from "./Components/Auth/Login";
import Profile from "./Components/Profile/Profile";

function App() {
  return (
    <div>
      <Routes>
          <Route path={'/'} element={<Login/>}/>
          <Route path={'/registration'} element={<Registration/>}/>
          <Route path={'/profile'} element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
