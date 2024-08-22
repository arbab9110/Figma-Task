import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Signup2 from "./components/Signup2";
import CourseSelect from "./components/CourseSelect";
import Signin from "./components/Signin";
import Forgot from "./components/Forgot";
import Dashboard1 from "./components/Dashboard1";
import Reports from "./components/Reports"
import Interviews from "./components/Interviews";
import Stipend from "./components/Stipend";
import Setting from "./components/Setting";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/candidateForm" element={<Signup2 />} />
          <Route path="/course" element={<CourseSelect />} />
          <Route path="/" element={<Signin />} />
          <Route path="/password" element={<Forgot />} />
          <Route path="/dashboard1" element={<Dashboard1 />} />
          <Route path="/report" element={<Reports />} /> 
          <Route path="/interview" element={<Interviews />} /> 
          <Route path="/stipend" element={<Stipend />} /> 
          <Route path="/setting" element={<Setting />} /> 
        </Routes>
      </Router>
     
    </>
  );
}

export default App;
