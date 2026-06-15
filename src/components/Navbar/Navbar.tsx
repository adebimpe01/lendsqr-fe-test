import React, { useState, useRef, useEffect } from 'react';
import { FiBell, FiSearch, FiChevronDown } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="/logo.svg" alt="Lendsqr" />
      </div>

      <div className="navbar__search">
        <input
          type="text"
          placeholder="Search for anything"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="navbar__search-btn">
          <FiSearch />
        </button>
      </div>

      <div className="navbar__right">
        <Link to="/docs" className="navbar__docs">
          Docs
        </Link>
        <button className="navbar__bell">
          <FiBell />
        </button>

        <div className="navbar__user" ref={menuRef}>
          <img src="/avatar.png" alt="user" className="navbar__avatar" />
          <span className="navbar__username">Adedeji</span>
          <button
            className="navbar__chevron"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <FiChevronDown />
          </button>

          {showUserMenu && (
            <div className="navbar__user-menu">
              <button className="navbar__user-menu-item">
                Profile
              </button>
              <button className="navbar__user-menu-item">
                Settings
              </button>
              <button
                className="navbar__user-menu-item navbar__user-menu-item--danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;