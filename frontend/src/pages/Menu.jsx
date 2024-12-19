import SideBar from "../layout/SideBar.jsx";
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
    <div>
      <SideBar/>
    </div>
  )
}

export default Menu