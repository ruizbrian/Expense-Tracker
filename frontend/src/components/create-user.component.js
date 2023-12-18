import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.togglePasswordVisibility =
            this.togglePasswordVisibility.bind(this);
        this.toggleDarkMode = this.toggleDarkMode.bind(this);

        this.state = {
            username: "",
            password: "",
            showPassword: false,
            error: "",
            successMessage: "",
            darkMode: false,
        };
    }

    onChangeUsername(e) {
        const uppercaseUsername = e.target.value.toUpperCase();
        this.setState({
            username: uppercaseUsername,
            error: "",
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
            error: "",
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password, // Include password in the user object
        };

        axios
            .post("http://localhost:5000/users/add", user)
            .then((res) => {
                console.log(res.data);
                // Update state with success message
                this.setState({
                    successMessage: "User created successfully!",
                });
            })
            .catch((error) => {
                // Handle registration error
                if (error.response && error.response.status === 400) {
                    console.log(
                        "Username already taken:",
                        error.response.data.error
                    );
                    this.setState({
                        error: "Username already taken. Please choose another.",
                    });
                } else {
                    console.error(
                        "Unexpected error during registration:",
                        error.message
                    );
                    this.setState({
                        error: "An unexpected error occurred. Please try again later.",
                    });
                }
            })
            .finally(() => {
                // Clear the username and password input fields regardless of success or failure
                this.setState({ username: "", password: "" });
            });
    }

    togglePasswordVisibility() {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword,
        }));
    }

    toggleDarkMode() {
        this.setState((prevState) => ({
            darkMode: !prevState.darkMode,
        }));
    }

    render() {
        return (
            <div
                className={`container-fluid ${
                    this.state.darkMode ? "bg-dark text-light" : ""
                }`}
            >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>Create New User</h3>
                    <button
                        className={`btn ${
                            this.state.darkMode ? "btn-light" : "btn-secondary"
                        }`}
                        onClick={this.toggleDarkMode}
                    >
                        Toggle Dark Mode
                    </button>
                </div>
                {this.state.error && (
                    <p style={{ color: "red" }}>{this.state.error}</p>
                )}
                {this.state.successMessage && (
                    <p style={{ color: "green" }}>
                        {this.state.successMessage}
                    </p>
                )}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            autoComplete="username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type={this.state.showPassword ? "text" : "password"}
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            autoComplete="current-password"
                        />
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.togglePasswordVisibility}
                            />
                            Show Password
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create User"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
                <p>Already Have an Account?</p>
                <Link
                    to="/login"
                    className={`btn btn-default border w-100 ${
                        this.state.darkMode ? "bg-light" : ""
                    } rounded-0 text-none`}
                >
                    Login
                </Link>
            </div>
        );
    }
}
