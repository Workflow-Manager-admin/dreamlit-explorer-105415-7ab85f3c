import React, { useState } from 'react';
import BookCard from './BookCard';
import './DreamToBook.css';

/**
 * PUBLIC_INTERFACE
 * Dream-to-Book AI Matching — dream input leads to animated book recs.
 */
function DreamToBook({ onBookClick }) {
  const [dreamText, setDreamText] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultBooks, setResultBooks] = useState([]);

  // PUBLIC_INTERFACE
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResultBooks([
        {
          id: 101,
          title: "Interpretation of Dreams",
          author: "Sigmund Freud",
          vibe: "introspective, symbolic",
          cover: "https://covers.openlibrary.org/b/id/8233791-L.jpg",
          description: "Freud's classic, a guide to the world of dreams.",
          symbols: ["psyche", "couch", "unconscious"],
        },
        {
          id: 102,
          title: "The Dreamers",
          author: "Karen Thompson Walker",
          vibe: "lush, epidemic, collective unconscious",
          cover: "https://covers.openlibrary.org/b/id/9785076-L.jpg",
          description: "A mysterious sleeping illness. Dreams, danger, hope.",
          symbols: ["sleep", "epidemic", "youth"],
        },
      ]);
      setLoading(false);
    }, 1200); // simulate network/AI
  };

  return (
    <section className="dream2book-container dream-fade-in">
      <h2>Dream-to-Book AI Match</h2>
      <form className="dream2book-form glassy-card" onSubmit={handleSubmit}>
        <textarea
          value={dreamText}
          onChange={e => setDreamText(e.target.value)}
          placeholder="Describe a recent dream with as much detail as you remember..."
          className="dream2book-input"
          required
        />
        <button className="dream2book-submit" disabled={loading}>
          {loading ? "Analyzing..." : "Find Matching Books"}
        </button>
      </form>
      {resultBooks.length > 0 &&
        <div className="dream2book-results">
          <h3>Your Dream Books</h3>
          <div className="feed-grid">
            {resultBooks.map(book =>
              <BookCard book={book} key={book.id} onClick={onBookClick} />
            )}
          </div>
        </div>
      }
    </section>
  );
}

export default DreamToBook;
