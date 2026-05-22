const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Användarnamn måste anges"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Lösenord måste anges"]
    },
    account_created: {
        type: Date,
        default: Date.now
    }
});

// Hasha lösenord innan användaren sparas
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);