const db = require("./db");

exports.getTasksByUser = (userId, callback) => {
  db.query("SELECT * FROM tasks WHERE user_id = ?", [userId], callback);
};

exports.getTaskById = (id, callback) => {
  const query = "SELECT * FROM tasks WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

exports.getAllTasks = (callback) => {
  db.query("SELECT * FROM tasks", callback);
};

exports.createTask = (task, callback) => {
  db.query("INSERT INTO tasks SET ?", task, callback);
};

exports.updateTask = (id, task, callback) => {
  db.query("UPDATE tasks SET ? WHERE id = ?", [task, id], callback);
};

exports.deleteTask = (id, callback) => {
  db.query("DELETE FROM tasks WHERE id = ?", [id], callback);
};
