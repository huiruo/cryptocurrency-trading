import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import './index.scss'

const Header = () => {
  const { pathname } = useLocation()

  return (
    <div className='header-container nav-div-shadow'>
      <div className='header-content container'>
        <ul className='ul'>

          <li className='li'>
            <NavLink to="/" className={pathname === '/' ? 'nav-active' : ''}>Home</NavLink>
          </li>

          <li className='li'>
            <NavLink to="/strategy" className={pathname === '/strategy' ? 'nav-active' : ''}>Strategy</NavLink>
          </li>

          <li className='li'>
            <NavLink to="/trade/balances" className={pathname === '/trade/balances' ? 'nav-active' : ''}>Balances</NavLink>
          </li>

          <li className='li'>
            <NavLink to="/trade/spot/order" className={pathname === '/trade/spot/order' ? 'nav-active' : ''}>Spot</NavLink>
          </li>

          <li className='li'>
            <NavLink to="/trade/future/order" className={pathname === '/trade/future/order' ? 'nav-active' : ''}>Future</NavLink>
          </li>

          <li className='li'>
            <NavLink to="/coin/list" className={pathname === '/coin/list' ? 'nav-active' : ''}>Coin list</NavLink>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default Header;
