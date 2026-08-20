import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

function BooksPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/v1/books"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const result = await response.json();

        setData(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return <h2>Loading books...</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Books Catalog</h1>

      {data.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="books-grid">
          {data.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              category={book.category}
              available={book.available}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BooksPage;