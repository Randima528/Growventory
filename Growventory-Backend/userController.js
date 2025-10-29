import db from "./db.js";
import bcrypt from "bcryptjs";

// Register a new user
export const registerUser = async (userData, callback) => {
  const { name, email, password } = userData;

  try {
    // Check if user already exists
    const checkUserSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserSql, [email], async (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }

      if (result.length > 0) {
        callback({ message: "User already exists with this email" }, null);
        return;
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert new user
      const insertUserSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      db.query(insertUserSql, [name, email, hashedPassword], (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }

        callback(null, {
          id: result.insertId,
          name: name,
          email: email,
          message: "User registered successfully"
        });
      });
    });
  } catch (error) {
    callback(error, null);
  }
};

// Login user
export const loginUser = (userData, callback) => {
  const { email, password } = userData;

  // Find user by email
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (result.length === 0) {
      callback({ message: "Invalid email or password" }, null);
      return;
    }

    const user = result[0];

    try {
      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        callback({ message: "Invalid email or password" }, null);
        return;
      }

      // Return user data (excluding password)
      callback(null, {
        id: user.id,
        name: user.name,
        email: user.email,
        message: "Login successful"
      });
    } catch (error) {
      callback(error, null);
    }
  });
};

// Get user by ID
export const getUserById = (id, callback) => {
  const sql = "SELECT id, name, email, created_at FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (result.length === 0) {
      callback({ message: "User not found" }, null);
      return;
    }

    callback(null, result[0]);
  });
};

// Get all users (admin function)
export const getAllUsers = (callback) => {
  const sql = "SELECT id, name, email, created_at FROM users";
  db.query(sql, (err, result) => {
    callback(err, result);
  });
};

// Update user profile
export const updateUser = (id, userData, callback) => {
  const { name, email } = userData;
  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  
  db.query(sql, [name, email, id], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (result.affectedRows === 0) {
      callback({ message: "User not found" }, null);
      return;
    }

    callback(null, { message: "User updated successfully" });
  });
};

// Delete user
export const deleteUser = (id, callback) => {
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (result.affectedRows === 0) {
      callback({ message: "User not found" }, null);
      return;
    }

    callback(null, { message: "User deleted successfully" });
  });
};
