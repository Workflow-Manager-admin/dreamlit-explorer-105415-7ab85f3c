import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './DreamSidebar.css';

/**
 * PUBLIC_INTERFACE
 * Sidebar navigation and quick access to journal/profile.
 */
function DreamSidebar({ theme, toggleTheme }) {
  const navigate = useNavigate();

  const username = "you"; // In real app, pull from auth

  return (
    <aside className="dream-sidebar glassy-card">
      <h1 className="sidebar-logo dream-glow">DreamReads</h1>
      <nav className="sidebar-nav">
        <NavLink to="/feed" className="sidebar-link" activeclassname="active">Dream Vibes Feed</NavLink>
        <NavLink to="/dream2book" className="sidebar-link" activeclassname="active">Dream-to-Book</NavLink>
        <NavLink to="/journal" className="sidebar-link" activeclassname="active">Journal</NavLink>
        <NavLink to="/symbols" className="sidebar-link" activeclassname="active">Symbols</NavLink>
        <NavLink to={`/profile/${username}`} className="sidebar-link profile-link" activeclassname="active">Profile</NavLink>
      </nav>
      <div className="sidebar-bottom">
        <button className="sidebar-theme-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dream Dark' : '☀️ Dream Light'}
        </button>
        <div className="sidebar-credit">✨</div>
      </div>
    </aside>
  );
}

export default DreamSidebar;
