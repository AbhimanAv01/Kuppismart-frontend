import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './login/login';
import Signup from "./signup/Signup.js";
import Expenses from "./expenses/Expenses.js";

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="/expenses" element={<Expenses />} />

    </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
