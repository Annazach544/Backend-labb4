const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authenticateToken");

// Skyddad route - kräver giltig JWT-token
router.get("/protected", authenticateToken, (req, res) => {
    res.json({
        message: "Detta är skyddad data",
        user: req.user,
        data: [
            "Endast inloggade användare kan se detta",
            "JWT-token skickades med och godkändes"
        ]
    });
});

module.exports = router;