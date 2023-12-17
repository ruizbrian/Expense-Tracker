import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);

        this.state = {
            username: "",
            password: "", // New state for password
            showPassword: false, 
            error: "",
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
                // Optionally, you can navigate to a different page or perform other actions on successful registration
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

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                {this.state.error && (
                    <p style={{ color: "red" }}>{this.state.error}</p>
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
            </div>
        );
    }
}