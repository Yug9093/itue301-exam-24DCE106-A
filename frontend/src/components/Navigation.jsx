import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <header className="header-bar">
      <h2 className="brand-title">📚 Library Portal</h2>
      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/books" className={({ isActive }) => (isActive ? "active" : "")}>
          Books
        </NavLink>
        <NavLink to="/borrow" className={({ isActive }) => (isActive ? "active" : "")}>
          Borrow Book
        </NavLink>
      </nav>
    </header>
  );
}

export default Navigation;