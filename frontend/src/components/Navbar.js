import React from 'react';

const Navbar = ({ title = 'Home' }) => {
  return (
    <nav className="nav">
      <div className="nav-left">
        <div className="bg-light-gray c12 spacing-vert-sm">
          <a className="brand" href="/">
            <h3 className="txt-white">
              <strong>{title}</strong>
            </h3>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
