import { useContext } from "react"
import AuthContext from "../../context/authContext"
import { CgProfile } from "react-icons/cg";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Transaction = ({billing, setBilling}) => {
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)

  function handleLogout(){
    logout()
    navigate("/login")
  }

  function handleRemove(index) {
    setBilling((prevBilling) => prevBilling.filter((_, i) => i !== index));
  }

  return (
    <div className='h-screen bg-primary w-[25vw] fixed right-0 z-1 flex flex-col items-center'>
      <div className="mt-10 flex bg-white rounded-[2rem] w-[90%] h-[80px] shadow-hard items-center justify-center gap-4">
        <CgProfile className="text-5xl text-primary"/>
        <div className="font-extrabold text-sm">
          <h1 >WELCOME!</h1>
          <h1>{user?.username}</h1>
        </div>
        <IoLogOutOutline className="text-5xl text-primary cursor-pointer" onClick={handleLogout}/>
      </div>
      <div className="flex flex-col mt-8 rounded-[2rem] bg-white w-[90%] h-[70%] shadow-hard justify-start items-center">
        <h1 className="text-2xl font-bold p-4">BILLS</h1>
        <div className="flex flex-col gap-4 p-4 h-[55%] overflow-y-auto font-bold">
          {
            billing.map((e, i) => (
              <div key={i} className="flex justify-between items-center gap-3">
                <div className="w-[200px] flex flex-col">
                  <h1>{e.name}</h1>
                  <div className="flex justify-between">
                    <h1>{e.quantity}x</h1>
                    <h1>₱{e.price}</h1>
                  </div>
                </div>
                <AiFillMinusCircle className="text-red-600 text-3xl cursor-pointer" onClick={() => handleRemove(i)} />
              </div>
            ))
          }
        </div>
        <div className="flex justify-between p-4 border-y-2 border-primary w-[80%] mt-4">
          <h1>Total:</h1>
          <h1>₱ {billing.reduce((acc, curr) => acc + curr.price, 0)}</h1>
        </div>
        <div className="flex justify-center p-4">
          <button className="bg-primary text-dark p-2 w-[150px] font-extrabold rounded-full">CONFIRM</button>
        </div>
      </div>
    </div>
  )
}
export default Transaction