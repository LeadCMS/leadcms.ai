import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <nav>
          <a href="/">Home</a>
          <a href="/blog">Blog</a>
        </nav>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} OnlineSales. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
