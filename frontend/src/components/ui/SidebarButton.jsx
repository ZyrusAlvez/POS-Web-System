import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarButton = ({ name, icon, url }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`bg-light font-bold w-[80%] h-12 rounded-xl flex justify-start items-center gap-4 pl-2 cursor-pointer text-3xl ${"/" + location.pathname.split('/')[1] === url ? "shadow-hard" : ""}`}
      onClick={() => navigate(url)}
    >
      {icon}
      <h1 className="text-base">{name}</h1>
    </div>
  );
};

export default SidebarButton;