import React from 'react';
import './BookDetailsModal.css';

/**
 * PUBLIC_INTERFACE
 * Modal overlay for showing book details and description.
 */
function BookDetailsModal({ book, onClose }) {
  return (
    <div className="modal-overlay dream-fade-in" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        <img className="modal-book-cover" src={book.cover} alt={book.title} />
        <h2 className="modal-book-title">{book.title}</h2>
        <div className="modal-book-author">{book.author}</div>
        <div className="modal-book-vibe">{book.vibe}</div>
        <p className="modal-book-description">{book.description}</p>
        <div className="modal-symbols">
          {book.symbols && book.symbols.map(sym =>
            <span className="modal-symbol" key={sym}>{sym}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetailsModal;
