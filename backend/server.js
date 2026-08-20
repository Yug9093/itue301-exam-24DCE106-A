const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

// ================================
// Middleware
// ================================

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Custom request logger middleware
function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();

  console.log(`[${req.method}] ${req.path} [${timestamp}]`);

  next();
}

// Apply logger globally
app.use(requestLogger);

// ================================
// In-memory data
// ================================

let books = [
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
// GET /api/v1/books
// ================================

app.get("/api/v1/books", (req, res) => {
  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
  });
});

// ================================
// GET /api/v1/borrowings
// ================================

app.get("/api/v1/borrowings", (req, res) => {
  res.status(200).json({
    success: true,
    count: borrowings.length,
    data: borrowings,
  });
});

// ================================
// POST /api/v1/borrowings
// ================================

app.post("/api/v1/borrowings", (req, res, next) => {
  try {
    const {
      memberId,
      bookId,
      borrowDate,
      returnDate,
      status,
    } = req.body;

    // Basic validation
    if (!memberId || !bookId || !borrowDate || !returnDate) {
      const error = new Error(
        "memberId, bookId, borrowDate and returnDate are required"
      );

      error.statusCode = 400;

      throw error;
    }

    // Validate status
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
// Global error handling middleware
// ================================

app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ================================
// Start server
// ================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});