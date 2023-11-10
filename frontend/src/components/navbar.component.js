import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="nabar nabar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">ExpenTracker</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Expense</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Create Expense Log</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/user" className="nav-link"> Create User</Link>
                    </li>
                    </ul>
                </div>

            </nav>
        );
    }
}