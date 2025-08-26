const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../data/users");

const SECRET_KEY = "mysecretkey"; // later move to .env

// Register new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: users.length + 1, name, email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully!" });
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // generate token
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
};
