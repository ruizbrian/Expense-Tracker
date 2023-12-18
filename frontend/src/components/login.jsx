import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3000/login", { username, password })
            .then((result) => {
                console.log(result);
                this.props.setAuth(true);
                navigator("/", { replace: true });
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            autoComplete="off"
                            name="username" // Change 'email' to 'username'
                            className="form-control rounded-0"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-success w-100 rounded-0"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
