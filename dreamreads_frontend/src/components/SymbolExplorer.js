import React, { useState } from 'react';
import BookCard from './BookCard';
import './SymbolExplorer.css';

/**
 * PUBLIC_INTERFACE
 * Symbol-based book exploration — animated, dreamy.
 */
const SYMBOLS = [
  { name: "🐉 Dragon", symbol: "dragon" },
  { name: "🗝️ Key", symbol: "key" },
  { name: "🌊 Water", symbol: "water" },
  { name: "🌙 Moon", symbol: "moon" },
  { name: "🦋 Butterfly", symbol: "butterfly" },
  { name: "🥀 Rose", symbol: "rose" },
];

const SYMBOL_BOOKS = {
  dragon: [
    {
      id: 311,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      vibe: "mythic, adventurous, magical",
      cover: "https://covers.openlibrary.org/b/id/8225691-L.jpg",
      description: "Bilbo's dream-quest with Smaug the dragon.",
      symbols: ["dragon", "quest", "courage"],
    }
  ],
  key: [
    {
      id: 312,
      title: "Coraline",
      author: "Neil Gaiman",
      vibe: "spooky, mysterious, symbolic",
      cover: "https://covers.openlibrary.org/b/id/9251346-L.jpg",
      description: "A secret key, and doors to dreamlike dangers.",
      symbols: ["key", "portal", "other world"],
    }
  ],
  // ...other symbol mappings (mocked for demo)
  water: [],
  moon: [],
  butterfly: [],
  rose: [],
};

function SymbolExplorer({ onBookClick }) {
  const [selected, setSelected] = useState(null);

  // PUBLIC_INTERFACE
  const handleSymbolClick = symbolObj => {
    setSelected(symbolObj);
  };

  const books = selected ? (SYMBOL_BOOKS[selected.symbol] || []) : [];

  return (
    <section className="symbol-explorer-container dream-fade-in">
      <h2>Symbol Explorer</h2>
      <div className="symbol-list">
        {SYMBOLS.map(sym =>
          <button
            key={sym.symbol}
            className={`symbol-btn dream-glow${selected && selected.symbol === sym.symbol ? ' active' : ''}`}
            onClick={() => handleSymbolClick(sym)}
          >
            {sym.name}
          </button>
        )}
      </div>
      <div className="symbol-books">
        {selected && books.length === 0 && <div className="symbol-no-books dream-fade-in">No books yet for this symbol. Try another!</div>}
        {books.length > 0 && (
          <div className="feed-grid">
            {books.map(book =>
              <BookCard book={book} key={book.id} onClick={onBookClick} />
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default SymbolExplorer;
