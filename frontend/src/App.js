import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExpenseList from "./components/expense-list.component";
import EditExpense from "./components/edit-expense.component";
import CreateExpense from "./components/create-expense.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container-fluid px-0">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<ExpenseList />} />
          <Route path="/edit/:id" element={<EditExpense />} />
          <Route path="/create" element={<CreateExpense />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </div>
    </Router>

    
  );
}


export default App;
