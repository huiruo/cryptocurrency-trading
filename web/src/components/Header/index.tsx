import React from 'react';
import { NavLink,useLocation } from "react-router-dom";
import './index.scss'

const Header =()=>{
  const { pathname } = useLocation()

  return (
    <div className='header-container nav-div-shadow'>
      <div className='header-content container'>
        <ul className='ul'>

          <li className='li'>
            <NavLink to="/" className={pathname==='/'?'nav-active':''}>首页</NavLink>
          </li>

          <li className='li'>
            <NavLink to="/strategy" className={pathname==='/strategy'?'nav-active':''}>策略</NavLink>
          </li>

          <li className='li'>
            <NavLink to="/account" className={pathname==='/account'?'nav-active':''}>账户</NavLink>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default Header;