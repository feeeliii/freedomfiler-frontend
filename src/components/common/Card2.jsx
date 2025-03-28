import React from 'react';

const Card = ({ children, title, showFooterText = true }) => {
  return (
    <div className="flex flex-col items-center cursor-default">
      <div className='text-center'>
        <h1 className='font-["Ranchers"] text-[#DD2634] leading-tight text-5xl font-bold mb-1'>{title}</h1>
      </div>
      
      {/* Container für Card und roten Hintergrund */}
      <div className="w-full px-4 -mt-3 relative">
        {/* Rotes Hintergrundelement */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] rounded-full bg-[#EC1119] opacity-20 z-0"
          style={{ filter: "blur(150px)" }}
        />
        
        <div className="flex justify-center relative z-10">
          {/* Main card */}
          <div className="bg-white rounded-lg shadow-md 
                        w-[95%] h-[555px]
                        max-w-[960px]
                        overflow-auto ml-5">
            {children}
          </div>
          
          {/* Vertical text container */}
          {showFooterText && (
            <div className="flex items-end ml-0.5 mb-3">
              <div className="vertical-text text-sm font-medium">
                Mit <span className="inline-block normal-orientation transition-transform duration-300 hover:scale-150">💙</span> für die Informationsfreiheit.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
