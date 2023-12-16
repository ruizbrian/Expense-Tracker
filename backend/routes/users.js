const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.route("/add").post(async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: "Username already taken." });
        }

        // If username is unique, create a new user
        const newUser = new User({ username, password });
        await newUser.save();

        res.json("User added!");
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
