# Library Management System

A full-stack web application for managing library books, members, and borrowings built with Node.js, Express, MongoDB, and React (Vite).

---

## 1. Project Name
**Library Management System** (`itue301-exam-24DCE106-A`)

---

## 2. Frontend Setup and Run Command
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   *(The application will run on `http://localhost:5173` by default)*

---

## 3. Backend Setup and Run Command
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   *(The backend server will run on `http://localhost:5000`)*

---

## 4. MongoDB Setup
1. Ensure **MongoDB** is installed and running locally (default port `27017`) or have a MongoDB Atlas connection string ready.
2. Verify the MongoDB service is active.
3. The backend application will automatically connect to MongoDB on server launch using Mongoose.

---

## 5. Required Environment Variables
Create a `.env` file in the `backend` directory (or use `.env.example` as a reference):

```env
MONGO_URI=your_mongodb_connection_string
```

- **`MONGO_URI`**: MongoDB connection string required for database connectivity.
