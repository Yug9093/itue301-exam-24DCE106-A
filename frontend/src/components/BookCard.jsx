function BookCard({ title, author, category, available }) {
  return (
    <div className="book-card">
      <h3>{title}</h3>

      <p>
        <strong>Author:</strong> {author}
      </p>

      <p>
        <strong>Category:</strong> {category}
      </p>

      <p>
        <strong>Availability:</strong>{" "}
        {available ? (
          <span className="badge available">Available</span>
        ) : (
          <span className="badge not-available">Not Available</span>
        )}
      </p>
    </div>
  );
}

export default BookCard;