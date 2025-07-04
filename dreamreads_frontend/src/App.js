import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DreamSidebar from './components/DreamSidebar';
import AnimatedBackground from './components/AnimatedBackground';
import Feed from './components/Feed';
import DreamToBook from './components/DreamToBook';
import DreamJournal from './components/DreamJournal';
import SymbolExplorer from './components/SymbolExplorer';
import Profile from './components/Profile';
import BookDetailsModal from './components/BookDetailsModal';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * DreamReads main app component.
 * Coordinates themed layout, sidebar, animated background, and all major routes.
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [modalBook, setModalBook] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Animate soft background automatically
  const handleBookCardClick = (book) => {
    setModalBook(book);
  };

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="dreamreads-app">
        <AnimatedBackground />
        <DreamSidebar theme={theme} toggleTheme={toggleTheme} />
        <main className="dreamreads-main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/feed" />} />
            <Route path="/feed" element={<Feed onBookClick={handleBookCardClick} />} />
            <Route path="/dream2book" element={<DreamToBook onBookClick={handleBookCardClick} />} />
            <Route path="/journal" element={<DreamJournal />} />
            <Route path="/symbols" element={<SymbolExplorer onBookClick={handleBookCardClick} />} />
            <Route path="/profile/:username" element={<Profile onBookClick={handleBookCardClick} />} />
            {/* You may add 404 route here for unmatched */}
          </Routes>
        </main>
        {modalBook && (
          <BookDetailsModal
            book={modalBook}
            onClose={() => setModalBook(null)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
