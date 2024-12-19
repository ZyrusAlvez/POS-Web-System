import SideBar from "../layout/SideBar.jsx";
import Main from "../components/Menu/Main.jsx";
import Transaction from "../components/Menu/Transaction.jsx";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Menu = () => {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate()

  function handleLogout(){
    logout()
    navigate("/login")
  }

  return (
    // div was used to imitate the width of the position:fixed component
    <div className="flex justify-between">
      <SideBar/>
      <div className="w-[15vw]"/>
      <Main />
      <div className="w-[25vw]"/>
      <Transaction />
    </div>
  )
}

export default Menu