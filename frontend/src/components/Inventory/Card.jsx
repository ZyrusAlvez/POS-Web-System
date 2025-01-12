import React, {useState} from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { toast } from 'sonner';
import { deleteItem, updateStock } from "../../api/inventory"

const Card = ({item, setData, data}) => {
  const [editMode, setEditMode] = useState(false)
  const [newAmount, setNewAmount] = useState(item?.amount)

  function handleClick(item){
    toast(`Delete ${item.name}?`, {
      action: {
        label: 'Yes',
        onClick: () => handleDelete(item._id)
      },
      position: "top-center",
      className: 'ml-[15%]',
      duration: 5000,
    });
  }
  
  function handleDelete(id){
    deleteItem(id)
      .then(() => {
        const newData = data.filter((item) => item._id !== id)
        setData(newData)
        toast.success('Item deleted successfully')
      })
      .catch((error) => toast.error(error.message))
  }

  function handleUpdate(){
    updateStock(item._id, Number(newAmount))
    .then((res) => {
      const updatedData = data.map((i) => (i._id === item._id ? res.data : i));
      setData(updatedData);
      setEditMode(false);
      toast.success(`${res.data.name} stock has been updated`)
    })
    .catch((error) => toast.error(error.message))
  }
  
  return (
    <>
      <div className="border-2 border-primary py-2 px-12 bg-light">{item.name}</div>
      <div className="border-2 border-primary py-2 px-12 bg-light grid grid-cols-2 items-center gap-4">
        {
          editMode ? <input className="w-8 text-center outline-none rounded-md" placeholder={item?.amount} onChange={(e) => setNewAmount(e.target.value)} value={newAmount}/> 
                   : <h1 className="text-end">{item?.amount}</h1>
        }
        <h1 className="text-start">{item?.unit}</h1>
      </div>
      <div className="flex">
        <FaRegTrashCan className="text-red-700 text-2xl mx-2 cursor-pointer" onClick={() => handleClick(item)}/>
        {
          !editMode ? <LuPencil className="text-blue-700 text-2xl mx-2 cursor-pointer" onClick={() => setEditMode(true)}/>
                    : <FaCheck className='text-green-700 text-2xl mx-2 cursor-pointer' onClick={handleUpdate}/>
        } 
      </div>
    </>
  )
}

export default Card