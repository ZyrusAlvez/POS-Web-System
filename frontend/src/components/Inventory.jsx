import {useState} from 'react'
import { addItem } from '../api/inventory'

const Inventory = () => {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)
  const [classification, setClassification] = useState("")

  function handleChangeName(e){
    setName(e.target.value)
  }
  function handleChangeAmount(e){
    setAmount(e.target.value)
  }
  function handleChangeClassification(e){
    setClassification(e.target.value)
  }

  function handleSubmit(){
    addItem(name, amount, classification)
  }

  return (
    <div className='flex flex-col'>
      <input placeholder='Name' onChange={(e) => handleChangeName(e)}/>
      <input placeholder='Amount' type="number" onChange={(e) => handleChangeAmount(e)} />
      <input placeholder='Classification' onChange={(e) => handleChangeClassification(e)} />
      <button className='border-2' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Inventory