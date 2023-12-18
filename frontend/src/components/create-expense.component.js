import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExpense extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBlurAmount = this.onBlurAmount.bind(this);
        this.toggleDarkMode = this.toggleDarkMode.bind(this);

        this.state = {
            username: "",
            description: "",
            amount: "",
            type: "expense", // Default to expense
            date: new Date(),
            users: [],
            darkMode: false,
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/users/").then((response) => {
            if (response.data.length > 0) {
                this.setState({
                    users: response.data.map((user) => user.username),
                    username: response.data[0].username,
                });
            }
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;
        const capitalizedDescription = description
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        this.setState({
            description: capitalizedDescription,
        });
    }

    onChangeAmount(e) {
        let value = e.target.value;

        // Remove non-numeric characters
        value = value.replace(/[^0-9.]/g, "");

        // Check if it's a valid number
        if (!isNaN(parseFloat(value))) {
            // Update the state without formatting to .00
            this.setState({
                amount: value,
            });
        } else {
            // Set to empty string if not a valid number
            this.setState({
                amount: "",
            });
        }
    }

    onBlurAmount() {
        // Add ".00" if the value is a whole number
        if (this.state.amount !== "" && !this.state.amount.includes(".")) {
            this.setState({
                amount: parseFloat(this.state.amount).toFixed(2),
            });
        }
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value,
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const expense = {
            username: this.state.username,
            description: this.state.description,
            amount:
                this.state.amount !== "" ? parseFloat(this.state.amount) : 0,
            type: this.state.type,
            date: this.state.date,
        };

        console.log(expense);

        axios
            .post("http://localhost:5000/expense/add", expense)
            .then((res) => console.log(res.data));

        window.location = "/";
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
                    <h3>Create New Entry</h3>
                    <button
                        className={`btn ${
                            this.state.darkMode ? "btn-light" : "btn-secondary"
                        }`}
                        onClick={this.toggleDarkMode}
                    >
                        Toggle Dark Mode
                    </button>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select
                            ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        >
                            {this.state.users.map(function (user) {
                                return (
                                    <option key={user} value={user}>
                                        {user}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <select
                            className="form-control"
                            value={this.state.type}
                            onChange={this.onChangeType}
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>
                            {this.state.type === "expense"
                                ? "Expense"
                                : "Income"}{" "}
                            (in Dollars):{" "}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.amount}
                            onChange={this.onChangeAmount}
                            onBlur={this.onBlurAmount.bind(this)}
                            placeholder={`Enter ${
                                this.state.type === "expense"
                                    ? "expense"
                                    : "income"
                            } amount`}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create Entry"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
