const pool = require("../db");

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const result = await pool.query(
      `INSERT INTO "Contacts" ("fullName", "email", "message")
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, message]
    );

    res.json({ message: "Contact message sent ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
