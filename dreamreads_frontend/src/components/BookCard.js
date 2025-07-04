import React from 'react';
import './BookCard.css';

/**
 * PUBLIC_INTERFACE
 * Card for a book (used throughout app); animated, clickable.
 */
function BookCard({ book, onClick }) {
  return (
    <div className="book-card glassy-card dream-float-in" tabIndex={0} onClick={() => onClick && onClick(book)}>
      <img className="book-card-cover" src={book.cover} alt={book.title} loading="lazy" />
      <div className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>
        <div className="book-card-author">{book.author}</div>
        <div className="book-card-vibe">{book.vibe}</div>
        <div className="book-card-symbols">{book.symbols && book.symbols.map(sym =>
          <span key={sym} className="book-card-symbol">{sym}</span>
        )}</div>
      </div>
    </div>
  );
}

export default BookCard;
