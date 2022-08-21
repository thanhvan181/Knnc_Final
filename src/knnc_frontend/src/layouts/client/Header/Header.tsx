import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
  return <div style={{backgroundColor: 'var(--primary)', color: 'var(--yellow)'}}>
    <Link to={'/admin'}>Header</Link>
    <h1 style={{backgroundColor: 'var(--red)', color: 'var(--yellow)'}}>Ahuhuh</h1>
    </div>;
};

export default Header;
