const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");

// Registrera användare
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username och password måste anges"
            });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(409).json({
                message: "Användarnamnet används redan"
            });
        }

        const user = new User({ username, password });

        await user.save();

        res.status(201).json({
            message: "Användare skapad"
        });

} catch (error) {
    console.error(error);

    res.status(500).json({
        message: "Serverfel",
        error: error.message
    });
}
});

// Logga in
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username och password måste anges"
            });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                message: "Felaktiga inloggningsuppgifter"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Felaktiga inloggningsuppgifter"
            });
        }

        const token = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Inloggning lyckades",
            token: token
        });

    } catch (error) {
    console.error(error);

    res.status(500).json({
        message: "Serverfel",
        error: error.message
    });
    }
});

module.exports = router;