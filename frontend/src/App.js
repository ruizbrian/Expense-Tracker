import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import Navbar from "./components/navbar.component";
import ExpenseList from "./components/expense-list.component";
import EditExpense from "./components/edit-expense.component";
import CreateExpense from "./components/create-expense.component";
import CreateUser from "./components/create-user.component";
import "./App.css"; // Import your styling file

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    };

    return (
        <Router>
            <Navbar
                className={`container-fluid px-0 ${
                    darkMode ? "dark-mode" : ""
                }`}
                toggleDarkMode={toggleDarkMode}
            />
            <div className={`container ${darkMode ? "dark-mode" : ""}`}>
                <br />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={<ExpenseList darkMode={darkMode} />}
                    />
                    <Route
                        path="/edit/:id"
                        element={<EditExpense darkMode={darkMode} />}
                    />
                    <Route
                        path="/create"
                        element={<CreateExpense darkMode={darkMode} />}
                    />
                    <Route
                        path="/user"
                        element={<CreateUser darkMode={darkMode} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
