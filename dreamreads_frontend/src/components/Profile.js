import React, { useState } from 'react';
import BookCard from './BookCard';
import './Profile.css';

/**
 * PUBLIC_INTERFACE
 * User Profile: switch between private journal feed and public dream-derived books.
 */
function Profile({ onBookClick }) {
  const [mode, setMode] = useState('public');

  const dreamBooks = [
    {
      id: 512,
      title: "Alice in Wonderland",
      author: "Lewis Carroll",
      vibe: "whimsical, surreal, puzzling",
      cover: "https://covers.openlibrary.org/b/id/8225262-L.jpg",
      description: "A dreamscape of symbols and madness.",
      symbols: ["rabbit", "dream", "queen"],
    }
  ];

  const myJournal = [
    {
      id: 2341,
      text: "Dreamt I was floating through endless white clouds with a yellow umbrella.",
      date: "2024-06-17 07:20"
    }
  ];

  // PUBLIC_INTERFACE
  return (
    <section className="profile-container dream-fade-in">
      <h2>My Profile</h2>
      <div className="profile-toggle">
        <button className={mode==='public' ? 'active' : ''} onClick={() => setMode('public')}>
          Public Book Feed
        </button>
        <button className={mode==='private' ? 'active' : ''} onClick={() => setMode('private')}>
          Private Dream Journal
        </button>
      </div>
      {mode === 'public' && (
        <div>
          <h3>Your Public Dream Book Feed</h3>
          <div className="feed-grid">
            {dreamBooks.map(book =>
              <BookCard book={book} key={book.id} onClick={onBookClick} />
            )}
          </div>
        </div>
      )}
      {mode === 'private' && (
        <div className="journal-entries">
          <h3>Your Dream Journal Entries</h3>
          {myJournal.length === 0 && <div>No entries yet.</div>}
          {myJournal.map(entry =>
            <div className="journal-entry glassy-card dream-fade-in" key={entry.id}>
              <div className="journal-entry-date">{entry.date}</div>
              <div className="journal-entry-text">{entry.text}</div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Profile;
