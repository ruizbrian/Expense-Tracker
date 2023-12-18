import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

const EditExpense = () => {
    const { id } = useParams();

    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);
    const [type, setType] = useState(""); // Add this line

    useEffect(() => {
        axios
            .get(`http://localhost:5000/expense/${id}`)
            .then((response) => {
                setUsername(response.data.username);
                setDescription(response.data.description);
                setAmount(response.data.amount);
                setDate(new Date(response.data.date));
                setType(response.data.type);
            })
            .catch(function (error) {
                console.log(error);
            });

        // Fetch users
        axios.get("http://localhost:5000/users/").then((response) => {
            if (response.data.length > 0) {
                setUsers(response.data.map((user) => user.username));
            }
        });
    }, [id]);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const onChangeExpense = (e) => {
        setAmount(e.target.value);
    };

    const onChangeDate = (date) => {
        setDate(date);
    };

    const onChangeType = (e) => setType(e.target.value);

const onSubmit = (e) => {
    e.preventDefault();

    const updatedExpense = {
        username,
        description,
        amount,
        date,
        type,
    };

    console.log("Updated Expense:", updatedExpense);

    axios
        .post(`http://localhost:5000/expense/update/${id}`, updatedExpense)
        .then((res) => {
            console.log(res.data);
            window.location = "/";
        })
        .catch((err) => console.error("Error updating expense:", err));
};


    return (
        <div>
            {
                <div>
                    <h3>Edit Transaction</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <select
                                required
                                className="form-control"
                                value={username}
                                onChange={onChangeUsername}
                            >
                                {users.map(function (user) {
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
                                value={type}
                                onChange={onChangeType}
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>
                                {type === "expense" ? "Expense" : "Income"} (in
                                Dollars):{" "}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={amount}
                                onChange={onChangeExpense}
                                placeholder={`Enter ${
                                    type === "expense" ? "expense" : "income"
                                } amount`}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={description}
                                onChange={onChangeDescription}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date: </label>
                            <div>
                                <DatePicker
                                    selected={date}
                                    onChange={onChangeDate}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-primary"
                            />
                        </div>
                    </form>
                </div>
            }
        </div>
    );
};

export default EditExpense;
