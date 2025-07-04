import React, { useState } from 'react';
import BookCard from './BookCard';
import './DreamToBook.css';

/**
 * PUBLIC_INTERFACE
 * Dream-to-Book AI Matching — Extracts keywords from user dream, queries Open Library, and shows dynamic book recs.
 */
function DreamToBook({ onBookClick }) {
  const [dreamText, setDreamText] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultBooks, setResultBooks] = useState([]);
  const [error, setError] = useState('');

  // Extracts up to 5 keywords from text based on noun-adj frequency (very basic for demo)
  function extractKeywords(text) {
    // Remove punctuation, split words, count frequency ignoring small/common words
    const stopwords = new Set([
      'the','and','for','with','a','an','of','to','it','in','is','on','by','that','as','at','was','but','are','be','from','this','i','my','me'
    ]);
    let words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopwords.has(w));
    let freq = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    // Sort by highest frequency, fallback to original order
    return [...new Set(words.sort((a, b) => (freq[b] || 0) - (freq[a] || 0)))].slice(0, 5);
  }

  // Query Open Library API for books matching the extracted keywords (using /search.json?q=query)
  async function fetchBooksFromOpenLibrary(keywords) {
    const q = encodeURIComponent(keywords.join(' '));
    const url = `https://openlibrary.org/search.json?q=${q}&language=eng&limit=12`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Open Library error: ${res.status}`);
      }
      const json = await res.json();
      return (json.docs || []).slice(0, 8).map(doc => ({
        id: doc.key || doc.cover_edition_key || doc.seed?.[0] || Math.random().toString(36),
        title: doc.title || "Unknown Title",
        author: doc.author_name ? doc.author_name.join(', ') : 'Unknown Author',
        vibe: (doc.subject && doc.subject.slice(0, 3).join(', ')) || '',
        cover: doc.cover_i 
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
          : 'https://openlibrary.org/images/icons/avatar_book-sm.png',
        description: doc.first_sentence
          ? (typeof doc.first_sentence === 'string' ? doc.first_sentence : doc.first_sentence[0])
          : (doc.subject && doc.subject.length ? `Themes: ${doc.subject.slice(0, 5).join(', ')}` : ''),
        symbols: doc.subject ? doc.subject.slice(0, 3) : [],
      }));
    } catch (e) {
      throw e;
    }
  }

  // PUBLIC_INTERFACE
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResultBooks([]);
    let keywords = extractKeywords(dreamText);
    if (keywords.length === 0) {
      setError("Please describe your dream in more detail.");
      setLoading(false);
      return;
    }
    try {
      const books = await fetchBooksFromOpenLibrary(keywords);
      if (!books.length) {
        setError(
          "No book matches found from Open Library for your dream. Try rephrasing or using different details!"
        );
        setResultBooks([]);
      } else {
        setResultBooks(books);
      }
    } catch (e) {
      setError("Could not fetch recommendations from Open Library at this time. Please try again later.");
      setResultBooks([]);
    }
    setLoading(false);
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
      {error &&
        <div style={{color: "#c0392b", margin: "18px 0" }} role="alert">{error}</div>
      }
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
