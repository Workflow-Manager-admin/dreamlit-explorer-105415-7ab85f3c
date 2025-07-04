import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import './Feed.css';

/**
 * PUBLIC_INTERFACE
 * Dream Vibes Book Feed - animated, fluid.
 */
function Feed({ onBookClick }) {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    // Normally would fetch; use demo data
    setBooks([
      {
        id: 1,
        title: "The Lathe of Heaven",
        author: "Ursula K. Le Guin",
        vibe: "surreal, existential, hopeful",
        cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
        description: "A dreamer whose visions can reshape reality.",
        symbols: ["dream", "reality", "agency"],
      },
      {
        id: 2,
        title: "Kafka on the Shore",
        author: "Haruki Murakami",
        vibe: "magical, enigmatic, emotional",
        cover: "https://covers.openlibrary.org/b/id/8312451-L.jpg",
        description: "An odyssey of dreams, symbols, and blurred realities.",
        symbols: ["cat", "library", "fate"],
      },
      // Add more for demo as needed
    ]);
  }, []);
  return (
    <section className="feed-container dream-fade-in">
      <h2 className="feed-title">Dream Vibes — Your Book Feed</h2>
      <div className="feed-grid">
        {books.map(book =>
          <BookCard book={book} key={book.id} onClick={onBookClick} />
        )}
      </div>
    </section>
  );
}

export default Feed;
