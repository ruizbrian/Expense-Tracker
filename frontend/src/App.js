import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/signUp';
import Login from './components/login';
import Navbar from './components/navbar.component';
import ExpenseList from './components/expense-list.component';
import EditExpense from './components/edit-expense.component';
import CreateExpense from './components/create-expense.component';
import CreateUser from './components/create-user.component';


function App() {
  return (
    <Router>
      <Navbar className="container-fluid px-0" />
      <div className="container">
        <br />
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
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