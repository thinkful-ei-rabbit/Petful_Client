import React from 'react';
import { Link } from 'react-router-dom';

type HeaderProps = () => JSX.Element;

const Header: HeaderProps = () => {
  return (
    <Link to="/">
      <h1 className="headline">PETFUL APP</h1>
    </Link>
  );
};

export default Header;
