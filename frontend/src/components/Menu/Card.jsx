import {useEffect, useRef, useState} from 'react'
import { PiPlusCircleFill, PiMinusCircleFill } from "react-icons/pi";

const Card = ({product, setBilling, billing}) => {
  const [price, setPrice] = useState(product.price_16oz)
  const [quantity, setQuantity] = useState(1)
  const [radbtn, setRadbtn] = useState('16oz')
  const [addOns, setAddOns] = useState([])
  const cupPrice = useRef(product.price_16oz)

  // resey price and quantity when product/category changes
  useEffect(() => {
    if (!product.price_16oz) {
      setPrice(product.price_22oz)  
      setRadbtn('22oz')
      cupPrice.current = product.price_22oz
    }else{
      setPrice(product.price_16oz)
      setRadbtn('16oz')
      cupPrice.current = product.price_16oz
    }
    setQuantity(1)
  }, [product, billing])

  function handleQuantity(variant) {
    let newQuantity = quantity;
    if (variant === "minus" && quantity > 1) {
      setQuantity(quantity - 1)
      newQuantity = quantity - 1;
    } 
    if (variant === "add") {
      setQuantity(quantity + 1)
      newQuantity = quantity + 1;
    }
    
    setPrice(Number(cupPrice.current * newQuantity))
  }

  function handleChange(e){
    // prevent negative quantity and letters
    if (e.target.value > -1) {
      setQuantity(Number(e.target.value))
      const newQuantity = e.target.value
      setPrice(Number(cupPrice.current * newQuantity))
    }
  }

  function handleAdd(){
    setBilling((prev) => [...prev, {name: product.name, quantity: quantity, price: price, addOns: addOns}])
  }

  return (
    <div className='w-[90%] h-[250px] bg-light rounded-2xl flex items-center font-bold'>
      <div className="w-[40%] h-full flex flex-col gap-6 mt-12">
        <div className='flex flex-col justify-start text-xl -gap-1 ml-[16%]'>
          <h1>{product.name}</h1>
          <h1>₱ {price}</h1>
        </div>
        <div className='flex flex-col w-full justify-center items-center gap-4'>
          <div className='flex gap-2'>
            <PiMinusCircleFill  onClick={() => handleQuantity("minus")} className='text-4xl cursor-pointer active:text-primary'/>
            <input
              className="outline-none w-20 rounded-md text-center text-xl bg-[#D9D9D9]"         
              value={quantity}
              onChange={((e) => handleChange(e))}
            />
            <PiPlusCircleFill onClick={() => handleQuantity("add")} className='text-4xl cursor-pointer active:text-primary'/>
          </div>
          <button className='rounded-full w-32 bg-primary h-8 text-sm active:bg-dark active:text-light' onClick={handleAdd}>ADD</button>
        </div>
      </div>
      <div className='flex-1 h-[80%] border-l-2 border-primary text-lg'>
        <div className='flex flex-col ml-4'>
          <h1>Size</h1>
          <div className='flex gap-4 mt-2'>
            <button className={`w-12 h-12 rounded-full text-black text-sm ${radbtn === '16oz' ? 'bg-primary': 'bg-white'} ${product.price_16oz ? 'block' : 'hidden'}`} onClick={() => {setRadbtn('16oz'); cupPrice.current = product.price_16oz; setPrice(cupPrice.current * quantity)}}>16oz</button>
            <button className={`w-12 h-12 rounded-full text-black text-sm ${radbtn === '22oz' ? 'bg-primary': 'bg-white'}`} onClick={() => {setRadbtn('22oz'); cupPrice.current = product.price_22oz; setPrice(cupPrice.current * quantity)}}>22oz</button>
          </div>
          <div>
            <h1 className='mt-2'>Add Ons</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card