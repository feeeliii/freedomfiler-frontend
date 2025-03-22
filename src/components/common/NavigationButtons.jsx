import React from "react";
import Button from "./Button2";

const NavigationButtons = ({ className = '', ...rest }) => {
  return (
    <div className={`w-[95%] max-w-[960px] mx-auto flex justify-center gap-4 sm:gap-8 md:gap-112 lg:gap-160 xl:gap-165 pt-3 ${className}`} {...rest}>
      <Button variant="navBack" className="!min-w-[128px]" />
      <Button variant="navForward" className="!min-w-[128px]" />
    </div>
  );
};

export default NavigationButtons;
