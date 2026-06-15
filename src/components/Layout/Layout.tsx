import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.scss';

interface LayoutProps {
  children: React.ReactNode;
  onOrgChange?: (org: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOrgChange }) => {
  return (
    <div className="layout">
      <Navbar />
      <Sidebar onOrgChange={onOrgChange} />
      <main className="layout__main">
        {children}
      </main>
    </div>
  );
};

export default Layout;