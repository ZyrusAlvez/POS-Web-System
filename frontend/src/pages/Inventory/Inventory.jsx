import SideBar from "../../layout/SideBar"
import Header from "../../components/Inventory/Header"
import { useState, useEffect } from "react"
import { getItemByCategory, deleteItem } from "../../api/inventory"
import Button from "../../components/ui/Button"
import { useNavigate } from "react-router-dom"
import { FaRegTrashCan } from "react-icons/fa6";
import { toast, Toaster } from 'sonner';

const Inventory = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState("flavors")
  const [data, setData] = useState([])

  useEffect(() => {
    getItemByCategory(category)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error))
  }, [category])

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
      .catch((error) => console.log(error))
  }

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col flex-grow items-center relative">
        <Header category={category} setCategory={setCategory}/>
        <Toaster richColors/>
        {data ? (
          <div className="grid grid-cols-[auto,auto,auto] text-center py-16 items-center">

            <h1 className="border-2 border-primary py-2 px-16 font-bold bg-light">ITEM</h1>
            <h1 className="border-2 border-primary py-2 px-12 font-bold bg-light">IN STOCK</h1>
            <h1></h1>

            {data && data.map((item) => (
              <>
                <div className="border-2 border-primary py-2 px-12 bg-light">{item.name}</div>
                <div className="border-2 border-primary py-2 px-12 bg-light grid grid-cols-2 items-center gap-4">
                  <h1 className="text-end">{item?.amount}</h1>
                  <h1 className="text-start">{item?.unit}</h1>
                </div>
                <FaRegTrashCan className="text-red-700 text-2xl ml-4 cursor-pointer" onClick={() => handleClick(item)}/>
              </>
            ))}
          </div> ) : (
            <h1>Loading...</h1>
          )
        }

        <Button style='px-16 py-4 text-lg mt-16 fixed right-0 bottom-0 mb-10 mr-10' onClick={() => navigate("./add-item")}>Add Item</Button>
      </div>
    </div>
  )
}

export default Inventory