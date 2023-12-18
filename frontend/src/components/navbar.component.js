import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaUser } from "react-icons/fa"; // Import icons from Font Awesome

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar fixed-bottom navbar-dark bg-dark p-0">
                <div className="container d-flex justify-content-center">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <FaHome size={20} /> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/create" className="nav-link">
                                <FaPlus size={20} /> Add Entry
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user" className="nav-link">
                                <FaUser size={20} /> Create User
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
