import React from 'react';

function KlageListItem({ name, onClick }) {
  return (
    <div 
      className="bg-gray-100 p-3 rounded-md hover:bg-gray-200 cursor-pointer transition-colors"
      onClick={onClick}
    >
      {name}
    </div>
  );
}

export default KlageListItem;
