import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default Layout;
