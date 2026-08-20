import BookCard from "../components/BookCard";

function BooksPage() {
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Fiction",
      available: true,
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Programming",
      available: false,
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self Help",
      available: true,
    },
  ];

  return (
    <div>
      <h1>Books</h1>

      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          category={book.category}
          available={book.available}
        />
      ))}
    </div>
  );
}

export default BooksPage;