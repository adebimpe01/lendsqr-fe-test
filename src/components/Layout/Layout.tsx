import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.scss';

interface LayoutProps {
  children: React.ReactNode;
  onOrgChange?: (org: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOrgChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        onOrgChange={onOrgChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="layout__main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
