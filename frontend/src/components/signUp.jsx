import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

function Signup() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('', {username, password})
        .then(result => console.log(result))
        .catch(err=> console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username">
                        <strong>Name</strong>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        autoComplete="off"
                        name="username"  // Change 'email' to 'username'
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
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                    </form>
                    <p>Already Have an Account?</p>
                    <Link to="/login" className="btn-btn-default border w-100 bg-light rounded-0 text-none">
                        Login
                    </Link>
                </div>
            </div>
    );
}

export default Signup;
