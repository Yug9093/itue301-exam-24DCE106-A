import { useState } from "react";

function BorrowPage() {
  const [memberName, setMemberName] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    alert("Borrowing form submitted!");
  }

  return (
    <div>
      <h1>Borrow Book</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Member Name</label>
          <input
            type="text"
            value={memberName}
            onChange={(event) => setMemberName(event.target.value)}
            placeholder="Enter member name"
          />
        </div>

        <div className="form-group">
          <label>Book Title</label>
          <input
            type="text"
            value={bookTitle}
            onChange={(event) => setBookTitle(event.target.value)}
            placeholder="Enter book title"
          />
        </div>

        <div className="form-group">
          <label>Borrow Date</label>
          <input
            type="date"
            value={borrowDate}
            onChange={(event) => setBorrowDate(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Return Date</label>
          <input
            type="date"
            value={returnDate}
            onChange={(event) => setReturnDate(event.target.value)}
          />
        </div>

        <button type="submit">
          Borrow Book
        </button>
      </form>

      <h2>Current Form Data</h2>
      <div className="summary-card">
        <p>
          <strong>Member:</strong> {memberName || "—"}
        </p>
        <p>
          <strong>Book:</strong> {bookTitle || "—"}
        </p>
        <p>
          <strong>Borrow Date:</strong> {borrowDate || "—"}
        </p>
        <p>
          <strong>Return Date:</strong> {returnDate || "—"}
        </p>
      </div>
    </div>
  );
}

export default BorrowPage;