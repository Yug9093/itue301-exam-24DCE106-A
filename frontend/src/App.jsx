import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";

import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BorrowPage from "./pages/BorrowPage";

function App() {
  return (
    <div>
      <Navigation />

      <hr />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/borrow" element={<BorrowPage />} />
      </Routes>
    </div>
  );
}

export default App;