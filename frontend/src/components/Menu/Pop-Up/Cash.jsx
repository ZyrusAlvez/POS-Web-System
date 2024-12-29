import { useState, useContext } from 'react'
import { toast } from 'sonner'
import { decrementByName } from "../../../api/inventory";
import { addSales } from "../../../api/user";
import AuthContext from "../../../context/AuthContext"
import Button from '../../ui/Button'
import { MdCancel } from "react-icons/md";

const Cash = ({submit, setSubmit, total, billing, setBilling}) => {
  const { user } = useContext(AuthContext)
  const [change, setChange] = useState(-total)
  const [payment, setPayment] = useState(0)

  function handleChange(e){
    if(e.target.value > -1){
      setPayment(Number(e.target.value))
      setChange(Number(e.target.value) - total)
    }
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
        await addSales(user?.id, total);
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

    setSubmit(false)
  }

  return (
    <div className={`w-screen h-screen ${submit ? 'flex' : 'hidden'} justify-center items-center bg-black bg-opacity-50 fixed top-0 left-0 z-[60]`}>
      <div className='relative h-1/2 w-[40%] min-w-[400px] bg-primary rounded-[2rem] flex flex-col items-center justify-center gap-y-8'>
        <MdCancel className='absolute top-0 right-0 mt-4 mr-4 text-4xl text-red-600 cursor-pointer' onClick={() => setSubmit(false)}/>
        <h1 className='font-bold text-4xl'>Cash Payment</h1>
        <div className='grid items-center justify-end grid-cols-[auto,auto] gap-4'>
          <h1 className='text-xl font-bold text-end'>Payment :</h1>
          <input className='outline-none rounded-full pl-2 text-xl w-[100px]' value={payment} onChange={(e) => handleChange(e)}/>
          <h1 className='text-xl font-bold text-end'>Change : </h1>
          <h1 className='text-xl pl-2 border-b-2 border-dark'>{change}</h1>
        </div>
        <Button style="px-8 py-2" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export default Cash