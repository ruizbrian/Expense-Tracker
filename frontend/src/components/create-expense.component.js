import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class CreateExpense extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeExpense = this.onChangeExpense.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            description: '',
            expense: '',
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeExpense(e) {
        let value = e.target.value;

        // Remove non-numeric characters
        value = value.replace(/[^0-9.]/g, '');

        // Check if it's a valid number
        if (!isNaN(parseFloat(value))) {
            // Update the state without formatting to .00
            this.setState({
                expense: value
            });
        } else {
            // Set to empty string if not a valid number
            this.setState({
                expense: ''
            });
        }
    }

    onBlurExpense() {
        // Add ".00" if the value is a whole number
        if (this.state.expense !== '' && !this.state.expense.includes('.')) {
            this.setState({
                expense: parseFloat(this.state.expense).toFixed(2)
            });
        }
    }


    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const expense = {
            username: this.state.username,
            description: this.state.description,
            expense: this.state.expense !== '' ? parseFloat(this.state.expense) : 0,
            date: this.state.date
        }

        console.log(expense)

        axios.post('http://localhost:5000/expense/add', expense)
        .then(res => console.log(res.data));

        window.location = "/";
    }

    render() {
        return (
            <div>
                <h3>Create New Entry</h3>
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
                        <label>Expense (in Dollars): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.expense}
                            onChange={this.onChangeExpense}
                            onBlur={this.onBlurExpense.bind(this)}
                            placeholder="Enter expense amount"
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
                        <input type="submit" value="Create Expense Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
