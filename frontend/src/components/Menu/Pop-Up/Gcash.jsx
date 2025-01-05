import { useState, useContext } from 'react'
import { toast } from 'sonner'
import { decrementByName } from "../../../api/inventory";
import { addSales } from "../../../api/user";
import AuthContext from "../../../context/AuthContext"
import Button from '../../ui/Button'
import { MdCancel } from "react-icons/md";
import { addItem } from "../../../api/sales";
import { getDate, getTime } from '../../../utility/stringFunctions';

const Gcash = ({submit, setSubmit, total, billing, setBilling}) => {
  const { user } = useContext(AuthContext)
  const [reference, setReference] = useState("")

  function handleSubmit() {
    async function decrementInventory() {
      try {
        for (const item of billing) {
          const ingredients = item.size === "16oz" ? item.product.ingredients_16oz : item.product.ingredients_22oz;
  
          // Reduce the inventory based on the add-ons' ingredients * quantity
          for (const addOn of item.addOns) {
            const addOnIngredients = addOn.ingredients;
            for (const ingredient in addOnIngredients) {
              try {
                await decrementByName({ name: ingredient, decrement: addOnIngredients[ingredient] * item.quantity });
              } catch (error) {
                console.error(`Error decrementing add-on ingredient ${ingredient}:`, error.name);
              }
            }
          }
  
          // Reduce the inventory based on the product's ingredients * quantity
          for (const ingredient in ingredients) {
            try {
              await decrementByName({ name: ingredient, decrement: ingredients[ingredient] * item.quantity });
            } catch (error) {
              console.error(`Error decrementing product ingredient ${ingredient}:`, error.name);
            }
          }
        }
  
        const date = getDate()
        const time = getTime()
  
        setBilling([]);
        await addSales(user?.id, total);
        await addItem({ billing, date, time, mop: "Gcash", ref: reference, total});
  
      } catch (error) {
        console.error('Error processing transaction:', error);
        throw error; // Re-throw the error to be caught by the toast.promise
      }
    }
  
    toast.promise(decrementInventory(), {
      loading: 'Loading Transaction...',
      success: 'Transaction Successful',
      error: (error) => `Error: ${error.name} - ${error.message}`,
    });

    setSubmit(false)
  }
  return (
    <div className={`w-screen h-screen ${submit ? 'flex' : 'hidden'} justify-center items-center bg-black bg-opacity-50 fixed top-0 left-0 z-[60]`}>
      <div className='relative h-[40%] w-[55%] min-w-[400px] bg-primary rounded-[2rem] flex flex-col items-center justify-center gap-y-8'>
        <MdCancel className='absolute top-0 right-0 mt-4 mr-4 text-4xl text-red-600 cursor-pointer' onClick={() => setSubmit(false)}/>
        <h1 className='font-bold text-4xl'>Gcash Payment</h1>
        <div className='grid items-center justify-end grid-cols-[auto,auto] gap-4'>
          <h1 className='text-xl font-bold text-end'>Reference Number :</h1>
          <input className='outline-none rounded-full pl-2 text-lg w-[300px]' value={reference} onChange={(e) => setReference(e.target.value)}/>
        </div>
        <Button style="px-8 py-2" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export default Gcash