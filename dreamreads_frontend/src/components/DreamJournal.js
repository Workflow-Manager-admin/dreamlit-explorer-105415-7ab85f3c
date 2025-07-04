import React, { useState } from 'react';
import './DreamJournal.css';

/**
 * PUBLIC_INTERFACE
 * Dream Journal page — animated, simple CRUD.
 */
function DreamJournal() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  // PUBLIC_INTERFACE
  const handleAddEntry = e => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setEntries([
        { text, date: new Date().toLocaleString(), id: Date.now() },
        ...entries,
      ]);
      setText('');
      setLoading(false);
    }, 500); // fake network
  };

  // PUBLIC_INTERFACE
  const handleDeleteEntry = id => {
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <section className="dreamjournal-container dream-fade-in">
      <h2>Your Dream Journal</h2>
      <form className="journal-form glassy-card" onSubmit={handleAddEntry}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          required
          placeholder="Record a new dream, in as much detail and feeling as you can..."
        />
        <button disabled={loading}>
          {loading ? 'Saving...' : 'Add Entry'}
        </button>
      </form>
      <div className="journal-entries">
        {entries.length === 0 && <div className="journal-empty">No entries yet. Start your dream archive!</div>}
        {entries.map(entry =>
          <div className="journal-entry glassy-card dream-fade-in" key={entry.id}>
            <div className="journal-entry-date">{entry.date}</div>
            <div className="journal-entry-text">{entry.text}</div>
            <button className="journal-entry-delete" onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default DreamJournal;
