import React from 'react';
import { NavLink } from 'react-router-dom'

const NavigationItem = ({ icon, title, path }) => (
  <li onClick={ () => localStorage.setItem('menu', 'open') } className="btn-block">
    <NavLink to={path} className="btn">
      <img src={icon} />
      <p>{title}</p>
    </NavLink>
  </li>
);

export default NavigationItem;
