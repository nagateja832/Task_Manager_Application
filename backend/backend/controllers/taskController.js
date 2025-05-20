const taskModel = require("../models/taskModel");
const db = require("../models/db");

exports.getTasks = (req, res) => {
  if (req.user.role === "admin") {
    taskModel.getAllTasks((err, results) => res.json(results));
  } else {
    taskModel.getTasksByUser(req.user.id, (err, results) => res.json(results));
  }
};

exports.getTaskById = (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;
  const role = req.user.role;

  const query =
    role === "admin"
      ? "SELECT * FROM tasks WHERE id = ?"
      : "SELECT * FROM tasks WHERE id = ? AND user_id = ?";

  const values = role === "admin" ? [taskId] : [taskId, userId];

  db.query(query, values, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(results[0]);
  });
};

exports.createTask = (req, res) => {
  const task = { ...req.body, user_id: req.user.id };
  taskModel.createTask(task, (err, result) =>
    res.json({ message: "Task created" })
  );
};

exports.updateTask = (req, res) => {
  taskModel.updateTask(req.params.id, req.body, (err, result) =>
    res.json({ message: "Task updated" })
  );
};

exports.deleteTask = (req, res) => {
  taskModel.deleteTask(req.params.id, (err, result) =>
    res.json({ message: "Task deleted" })
  );
};
