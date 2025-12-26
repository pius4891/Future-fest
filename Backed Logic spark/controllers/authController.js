const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    try {
        await User.create({ name, email, password: hashed, role });
        res.json({ message: "Registration successful ✅" });
    } catch {
        res.status(400).json({ message: "User already exists ❌" });
    }
};

// LOGIN
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found ❌" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password ❌" });

    res.json({
        message: "Login successful ✅",
        user: {
            id: user._id,
            name: user.name,
            role: user.role
        }
    });
};
