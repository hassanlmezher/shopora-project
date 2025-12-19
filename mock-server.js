import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 4000;
const JWT_SECRET = "demo-secret-key";

app.use(cors());
app.use(express.json());

// In-memory storage for demo
const users = [];
const stores = [];
const products = [];
const cartItems = [];
const favorites = [];
const orders = [];

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      // Token verification failed, but continue for demo
    }
  }
  next();
};

app.get("/", (req, res) => {
  res.send("Shopora Mock Backend Running!");
});

// Auth routes
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password || password.length < 6) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if user exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user (without password hashing for demo)
    const user = {
      _id: Date.now().toString(),
      email: email.toLowerCase(),
      password, // In real app, this would be hashed
      role: email === "admin@gmail.com" ? "admin" : "user"
    };

    users.push(user);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user: {
        _id: user._id,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        _id: user._id,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Demo data routes
app.get("/api/stores", verifyToken, (req, res) => {
  res.json({ stores });
});

app.get("/api/products", verifyToken, (req, res) => {
  res.json({ products });
});

app.get("/api/cart", verifyToken, (req, res) => {
  const userCart = cartItems.filter(item => item.userId === req.user?.userId);
  res.json({ items: userCart });
});

app.get("/api/favorites", verifyToken, (req, res) => {
  const userFavorites = favorites.filter(item => item.userId === req.user?.userId);
  res.json({ items: userFavorites });
});

app.get("/api/orders", verifyToken, (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.user?.userId);
  res.json({ orders: userOrders });
});

// Sample data for demo
if (products.length === 0) {
  products.push(
    {
      _id: "1",
      name: "Demo Product 1",
      price: 29.99,
      description: "Sample product for demo",
      category: "Electronics"
    },
    {
      _id: "2", 
      name: "Demo Product 2",
      price: 49.99,
      description: "Another sample product",
      category: "Clothing"
    }
  );
}

app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
});
