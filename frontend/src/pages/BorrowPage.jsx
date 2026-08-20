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
        <div>
          <label>Member Name:</label>
          <br />

          <input
            type="text"
            value={memberName}
            onChange={(event) => setMemberName(event.target.value)}
            placeholder="Enter member name"
          />
        </div>

        <br />

        <div>
          <label>Book Title:</label>
          <br />

          <input
            type="text"
            value={bookTitle}
            onChange={(event) => setBookTitle(event.target.value)}
            placeholder="Enter book title"
          />
        </div>

        <br />

        <div>
          <label>Borrow Date:</label>
          <br />

          <input
            type="date"
            value={borrowDate}
            onChange={(event) => setBorrowDate(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Return Date:</label>
          <br />

          <input
            type="date"
            value={returnDate}
            onChange={(event) => setReturnDate(event.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Borrow Book
        </button>
      </form>

      <hr />

      <h2>Current Form Data</h2>

      <p>
        <strong>Member:</strong> {memberName}
      </p>

      <p>
        <strong>Book:</strong> {bookTitle}
      </p>

      <p>
        <strong>Borrow Date:</strong> {borrowDate}
      </p>

      <p>
        <strong>Return Date:</strong> {returnDate}
      </p>
    </div>
  );
}

export default BorrowPage;