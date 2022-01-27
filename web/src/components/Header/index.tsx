import React from 'react';
import { Box } from '@fower/react'
import { NavLink } from "react-router-dom";

const Header =()=>{
  return (
    <Box flex minH='.64rem' w='100%' minW="15.20rem" px="0.24rem" bg='#fff' className='nav-box-shadow'>
      <Box as='ul' flex text='0.15rem' fontWeight='600' listNone>
        <Box as='li' listNone pr="0.12rem">
          <NavLink to="/" style={{textDecoration: 'none', color: "#707a8a"}} className="nav-active">首页</NavLink>
        </Box>
        <Box as='li' listNone pr="0.12rem">
          <NavLink to="/strategy" style={{textDecoration: 'none', color: "#707a8a"}} className="nav-active">策略</NavLink>
        </Box>
        <Box as='li' listNone pr="0.12rem">
          <NavLink to="/account" style={{textDecoration: 'none', color: "#707a8a"}} className="nav-active">账户</NavLink>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;