import React from 'react';

const ProgressCard = ({ 
  title = 'Title', 
  weight = 'Weight', 
  information = 'Information' 
}) => {
  return (
    <div className="bg-[#F4FFC3] rounded-lg shadow-md px-6 py-5 w-[25vw] text-center flex flex-col gap-2">
      <h2 className="text-gray-800 text-sm font-semibold mb-1">
        {title}
      </h2>
      <p className="text-gray-900 text-2xl font-bold mb-1">
        {weight}
      </p>
      <p className="text-gray-600 text-xs">
        {information}
      </p>
    </div>
  );
};

export default ProgressCard;
