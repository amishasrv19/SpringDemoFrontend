import React from "react";
//import { Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import UploadDoc from "./Components/LoginForm/UploadDoc";
import ViewAllImages from "./Components/LoginForm/ViewAllImages";

const App = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginForm />} />
           <Route path="/UploadDoc" element={<UploadDoc />} />
            <Route path="/ViewAllImages" element={<ViewAllImages  />} />

        </Routes>
        </BrowserRouter>
    );
};

export default App;
/*import './App.css';
// import Navbar from './Components/Navbar';
import Login from './Components/Login';
import UPloaddoc from './Components/UPloaddoc';



import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Navbar /> }
        
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/UPloaddoc" element={<UPloaddoc/>} />
          

          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;*/