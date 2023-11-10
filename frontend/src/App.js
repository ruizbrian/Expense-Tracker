import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExpenseList from "./components/expense-list.component";
import EditExpense from "./components/edit-expense.component";
import CreateExpense from "./components/create-expense.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" exact element={<ExpenseList />} />
        <Route path="edit/:id" element={<EditExpense />} />
        <Route path="create" element={<CreateExpense />} />
        <Route path="user" element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
