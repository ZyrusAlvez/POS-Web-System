import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = ({title = "Settings", nav = -1}) => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-between text-4xl font-bold w-full p-4'>
      <IoIosArrowBack className='text-5xl cursor-pointer' onClick={() => navigate(nav)}/>
      <h1>{title}</h1>
      <div className='w-5'></div>
    </div>
  );
};

export default Header;