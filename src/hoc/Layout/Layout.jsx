import React from 'react';
import SideBar from '../../components/SideBar';

import './Layout.css';

const Layout = ({ children }) => (
  <div className="application-layout">
    <SideBar />
    <main className="main">
      {children}
    </main>
  </div>
);

export default Layout;
