import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            error: "",
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
            error: "", // Clear any previous error when the user starts typing again
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
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
                // Clear the username input field regardless of success or failure
                this.setState({ username: "" });
            });
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
