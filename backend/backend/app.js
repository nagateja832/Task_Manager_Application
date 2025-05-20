const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// app.listen(5000, () => console.log("🚀 Server running on port 5000"));

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

app.listen(3001, () => console.log("✅ Server running on port 3001"));
