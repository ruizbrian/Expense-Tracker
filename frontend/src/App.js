import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';
import Navbar from './components/navbar.component';
import ExpenseList from './components/expense-list.component';
import EditExpense from './components/edit-expense.component';
import CreateExpense from './components/create-expense.component';
import CreateUser from './components/create-user.component';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem('auth')) || false
  );

  const setAuth = (value) => {
    setIsAuthenticated(value);
    console.log("setAuth = " + value);
  };

  useEffect(()=>{
    localStorage.setItem("auth", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // if (!setAuth) {
  //   navigator("/user", {replace: false });
  // };

  return (
    <Router>
      <Navbar className="container-fluid px-0" />
      <div className="container">
        <br />
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} /> } />
          <Route path="/" element={isAuthenticated ? <ExpenseList /> : <Navigate to="/user" replace /> } />
          <Route path="/edit/:id" element={isAuthenticated ? <EditExpense /> : <Navigate to="/user" replace /> } />
          <Route path="/create" element={<CreateExpense />} />
          <Route path="/user" element={<CreateUser setAuth={setAuth} /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;