import { useContext, useState } from "react"
import AuthContext from "../../context/AuthContext"
import { CgProfile } from "react-icons/cg";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BsCash } from "react-icons/bs";
import { FaWallet } from "react-icons/fa";
import { decrementByName } from "../../api/inventory";
import { toast, Toaster } from "sonner";
import { addSales } from "../../api/user";

const Transaction = ({billing, setBilling}) => {
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)
  const [payment, setPayment] = useState("cash")

  function handleLogout(){
    logout()
    navigate("/login")
  }

  function handleRemove(index) {
    setBilling((prevBilling) => prevBilling.filter((_, i) => i !== index));
  }

  function handleSubmit(){
    async function decrementInventory() {
      try {
        for (const item of billing) {
          const ingredients = item.size === "16oz" ? item.product.ingredients_16oz : item.product.ingredients_22oz;
          for (const ingredient in ingredients) {
            await decrementByName({ name: ingredient, decrement: ingredients[ingredient] * item.quantity });
          }
        }
        setBilling([]);
        await addSales(user?.id, billing.reduce((acc, curr) => acc + curr.price, 0));
        return true;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    
    toast.promise(decrementInventory(), {
      loading: 'Loading Transaction...',
      success: 'Transaction Successful',
      error: 'Error Processing Transaction, Please Try Again',
    })
  }

  return (
    <div className='h-screen bg-primary w-[25vw] fixed right-0 z-1 flex flex-col items-center gap-4 py-4 font-bold min-w-[200px]'>
      <Toaster richColors />
      <div className="flex bg-white rounded-[2rem] w-[90%] h-[80px] shadow-hard items-center justify-center gap-8">
        <CgProfile className="text-5xl text-primary"/>
        <div className="font-extrabold text-sm">
          <h1 >WELCOME!</h1>
          <h1>{user?.username}</h1>
        </div>
        <IoLogOutOutline className="text-5xl text-primary cursor-pointer" onClick={handleLogout}/>
      </div>
      <div className="flex flex-col rounded-[2rem] bg-white w-[90%] h-[85%] shadow-hard justify-start items-center">
        <h1 className="text-2xl font-bold p-4">BILLS</h1>
        <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto font-bold w-full">
          {
            billing.map((e, i) => (
              <div key={i} className="flex flex-col justify-between items-center w-full">
                <div className="flex justify-between items-center w-full flex-grow gap-3">
                  <div className="w-full">
                    <div className="flex items-center">
                      <h1>{e.product.name}</h1>
                      <h1 className="text-sm bg-primary px-[4px] rounded-lg ml-2">{e.size}</h1>
                    </div>
                    <div className="flex justify-between">
                      <h1>{e.quantity}x</h1>
                      <h1>₱ {e.price}</h1>
                    </div>
                  </div>
                  <AiFillMinusCircle className="text-red-600 text-3xl cursor-pointer" onClick={() => handleRemove(i)} />
                </div>
                <div className="flex flex-col w-full ml-8 text-sm font-medium">
                  {e.addOns.map((add, i) => (
                    <div className="flex justify-between w-[75%]" key={i}>
                      <h1>• {add.name}</h1>
                      <h1>₱ {add.price}</h1>
                    </div>
                  ))}
                </div>
              </div>
            ))
          }
        </div>
        <div className="flex justify-between py-2 border-y-2 border-primary w-[85%] mt-4">
          <h1>Total:</h1>
          <h1>₱ {billing.reduce((acc, curr) => acc + curr.price, 0)}</h1>
        </div>
        <div className="flex flex-col w-full px-5 mt-2">
          <h1 className="mb-2">Payment</h1>
          <div className="flex justify-evenly items-end">
            <div className="flex flex-col items-center cursor-pointer" onClick={() => setPayment('cash')}>
              <BsCash className={`text-5xl rounded-xl ${payment === 'cash' ? 'bg-primary' : 'bg-white'}`}/>
              <h1>Cash</h1>
            </div>
            <div className="flex flex-col items-center cursor-pointer" onClick={() => setPayment('gcash')}>
              <FaWallet className={`text-5xl rounded-sm ${payment === 'gcash' ? 'bg-primary' : 'bg-white'}`}/>
              <h1>GCash</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-4">
          <button className="bg-primary text-dark p-2 w-[150px] font-extrabold rounded-full" onClick={() => handleSubmit()}>CONFIRM</button>
        </div>
      </div>
    </div>
  )
}
export default Transaction