import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Larger horizontally stretched blurred oval with stronger blur */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] rounded-full bg-[#EC1119] opacity-20"
        style={{ filter: "blur(150px)" }} // Increased blur strength
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;
