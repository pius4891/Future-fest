const express = require("express");
const cors = require("cors");
require("dotenv").config();

const contactRoutes = require("./routes/contact.routes");
const sponsorRoutes = require("./routes/sponsor.routes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Logic Spark Backend Running 🚀");
});

app.use("/api/contact", contactRoutes);
app.use("/api/sponsor", sponsorRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
