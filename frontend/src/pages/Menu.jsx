import SideBar from "../layout/SideBar.jsx";
import Main from "../components/Menu/Main.jsx";
import Transaction from "../components/Menu/Transaction.jsx";
import { useContext, useState } from "react";
import AuthContext from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

const Menu = () => {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate()
  const [billing, setBilling] = useState([])



  return (
    // div was used to imitate the width of the position:fixed component
    <div className="flex justify-between">
      <SideBar/>
      <div className="w-[15vw]"/>
      <Main billing={billing} setBilling={setBilling}/>
      <div className="w-[25vw]"/>
      <Transaction billing={billing} setBilling={setBilling}/>
    </div>
  )
}

export default Menu