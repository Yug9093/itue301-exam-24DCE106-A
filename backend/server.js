const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Book = require("./models/Book");
const Member = require("./models/Member");
const Borrowing = require("./models/Borrowing");

dotenv.config();

const app = express();

const PORT = 5000;

// ================================
// Middleware
// ================================

app.use(cors());

app.use(express.json());

// ================================
// Request Logger
// ================================

function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();

  console.log(
    `[${req.method}] ${req.path} [${timestamp}]`
  );

  next();
}

app.use(requestLogger);

// ================================
// In-memory data for Task 3/4
// ================================

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    isbn: "9780743273565",
    available: true,
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    isbn: "9780132350884",
    available: false,
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    isbn: "9780735211292",
    available: true,
  },
];

let borrowings = [];

// ================================
// TASK 3 APIs
// ================================

// GET all books
app.get("/api/v1/books", (req, res) => {
  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
  });
});

// GET all borrowings
app.get("/api/v1/borrowings", (req, res) => {
  res.status(200).json({
    success: true,
    count: borrowings.length,
    data: borrowings,
  });
});

// POST borrowing
app.post("/api/v1/borrowings", (req, res, next) => {
  try {
    const {
      memberId,
      bookId,
      borrowDate,
      returnDate,
      status,
    } = req.body;

    if (!memberId || !bookId || !borrowDate || !returnDate) {
      const error = new Error(
        "memberId, bookId, borrowDate and returnDate are required"
      );

      error.statusCode = 400;

      throw error;
    }

    const validStatuses = [
      "borrowed",
      "returned",
      "overdue",
    ];

    const borrowingStatus = status || "borrowed";

    if (!validStatuses.includes(borrowingStatus)) {
      const error = new Error(
        "Status must be borrowed, returned or overdue"
      );

      error.statusCode = 400;

      throw error;
    }

    const newBorrowing = {
      id: borrowings.length + 1,
      memberId,
      bookId,
      borrowDate,
      returnDate,
      status: borrowingStatus,
    };

    borrowings.push(newBorrowing);

    res.status(201).json({
      success: true,
      message: "Borrowing record created successfully",
      data: newBorrowing,
    });
  } catch (error) {
    next(error);
  }
});

// ================================
// TASK 5 MongoDB Test APIs
// ================================

// Create a book in MongoDB
app.post("/api/v1/mongodb/books", async (req, res, next) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
});

// Create a member in MongoDB
app.post("/api/v1/mongodb/members", async (req, res, next) => {
  try {
    const member = await Member.create(req.body);

    res.status(201).json({
      success: true,
      message: "Member created successfully",
      data: member,
    });
  } catch (error) {
    next(error);
  }
});

// Create a borrowing record in MongoDB
app.post(
  "/api/v1/mongodb/borrowings",
  async (req, res, next) => {
    try {
      const borrowing = await Borrowing.create(req.body);

      res.status(201).json({
        success: true,
        message: "Borrowing record created successfully",
        data: borrowing,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get MongoDB books
app.get("/api/v1/mongodb/books", async (req, res, next) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
});

// ================================
// Global Error Handler
// ================================

app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = {};

    for (const field in err.errors) {
      errors[field] = err.errors[field].message;
    }

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // Duplicate key error
  if (err.code === 11000) {
    const duplicateField = Object.keys(
      err.keyValue || {}
    )[0];

    return res.status(400).json({
      success: false,
      message: `${duplicateField} already exists`,
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ================================
// MongoDB Connection
// ================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });