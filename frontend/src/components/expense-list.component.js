import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Expense = (props) => {
    const handleDelete = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );
        if (confirmDelete) {
            props.deleteExpense(props.expense._id);
        }
    };

    return (
        <tr>
            <td>{props.expense.username}</td>
            <td>{props.expense.description}</td>
            <td
                style={{
                    color: props.expense.type === "income" ? "green" : "red",
                }}
            >
                {props.expense.type === "income" ? "+" : "-"} ${" "}
                {props.expense.amount}
            </td>
            <td>{props.expense.date.substring(0, 10)}</td>
            <td>
                <Link to={"/edit/" + props.expense._id}>
                    <button className="btn btn-dark">Edit</button>
                </Link>{" "}
                |{" "}
                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default class ExpenseList extends Component {
    constructor(props) {
        super(props);

        this.deleteExpense = this.deleteExpense.bind(this);

        this.state = { expense: [] };
    }

    componentDidMount() {
        axios
            .get("http://localhost:5000/expense/")
            .then((response) => {
                // Sort expenses by date in descending order (most recent first)
                const sortedExpenses = response.data.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );

                this.setState({ expense: sortedExpenses });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteExpense(id) {
        axios
            .delete("http://localhost:5000/expense/" + id)
            .then((res) => console.log(res.data));

        this.setState({
            expense: this.state.expense.filter((el) => el._id !== id),
        });
    }

    expenseList() {
        return this.state.expense.map((currentExpense) => {
            return (
                <Expense
                    expense={currentExpense}
                    deleteExpense={this.deleteExpense}
                    key={currentExpense._id}
                />
            );
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <h3>Logged Transactions</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Transactions</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{this.expenseList()}</tbody>
                </table>
            </div>
        );
    }
}
