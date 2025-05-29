import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
  
    <div className="inline-flex gap-3 items-center mb-4 group">
  <p className="text-gray-700 text-xl font-semibold drop-shadow-lg transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:text-purple-500">
    {text1}
    <span className="text-purple-700 font-bold text-shadow-lg group-hover:text-purple-900">
      {text2}
    </span>
  </p>
  <p className="w-10 sm:w-14 h-[3px] bg-gradient-to-r from-purple-500 to-purple-700 rounded-md shadow-md 
     transition-all duration-300 ease-in-out group-hover:w-16 group-hover:h-[4px] group-hover:from-purple-400 group-hover:to-purple-900">
  </p>
</div>
  );
};

export default Title;