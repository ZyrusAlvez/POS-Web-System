import React from "react";

const Button = ({ style, children, onClick }) => {
  return (
    <button
      className={`rounded-full bg-dark text-white font-bold active:bg-light active:text-black ${style}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;