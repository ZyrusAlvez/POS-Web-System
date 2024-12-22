import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-between text-4xl font-bold w-full p-4'>
      <IoIosArrowBack className='text-5xl cursor-pointer' onClick={() => navigate(-1)}/>
      <h1>Settings</h1>
      <div className='w-5'></div>
    </div>
  );
};

export default Header;