import React from "react";
import Card from "../common/Card2.jsx";
import Navbar from "../common/Navbar.jsx";
import NavigationButtons from "../common/NavigationButtons.jsx";

const PageLayout = ({ 
  title, 
  children, 
  showNavigation = true
}) => {
  return (
    <div>
        <Navbar />
        <div className="flex flex-col items-center w-full">
            <div className="w-full mx-auto">
                <Card title={title}>
                    {children}
                </Card>
                {showNavigation && <NavigationButtons />}
            </div>
        </div>
    </div>
  );
};

export default PageLayout;
