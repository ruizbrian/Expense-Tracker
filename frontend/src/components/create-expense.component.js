import React, { Component } from 'react';

export default class CreateExpense extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username : '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    onChangeUsername(e) {
        this.state({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.state({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.state({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.state({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const expense = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(expense)

        window.location = "/";
    }

    render() {
        return (
            <div>
                <p>You are on the Create Expense component!</p>
            </div>
        )
    }
}