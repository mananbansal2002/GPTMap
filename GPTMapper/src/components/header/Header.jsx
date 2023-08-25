import React, { useState, useEffect } from 'react';
import '../../App.css';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen(prevIsNavOpen => !prevIsNavOpen);
  };

  return (
    <header className={isSticky ? 'sticky' : ''}>
      <div className='header-container'>
        <div className="logo">GPTMapper</div>
        <div className={`nav ${isNavOpen ? 'open' : ''}`}>
          <div className='nav-toggle' onClick={toggleNav}>
            <span className='bar'></span>
            <span className='bar'></span>
            <span className='bar'></span>
          </div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li className='active'><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
