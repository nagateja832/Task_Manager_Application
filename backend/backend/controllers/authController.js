const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("../models/userModel");

exports.signup = (req, res) => {
  const { name, email, password, role } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    createUser({ name, email, password: hash, role }, (err, result) => {
      if (err) return res.status(400).json({ error: "Signup failed" });
      res.json({ message: "User created" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  findUserByEmail(email, (err, results) => {
    if (results.length === 0)
      return res.status(401).json({ error: "Invalid email" });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (!match) return res.status(401).json({ error: "Wrong password" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET
      );
      res.json({ message: "Login success", role: user.role, token });
    });
  });
};
