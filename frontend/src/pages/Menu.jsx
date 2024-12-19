import Inventory from "../components/Inventory"
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Menu = () => {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate()

  function handleLogout(){
    logout()
    navigate("/login")
  }

  return (
    user ? <div>
      <h1 className="text-6xl">Hello {user.username}</h1>
      <button onClick={handleLogout}>log out</button>
    </div> : <h1>Loading</h1>

  )
}

export default Menu