import SideBar from "../../layout/SideBar"
import Header from "../../components/Inventory/Header"
import { useState, useEffect } from "react"
import { getItemByCategory } from "../../api/inventory"
import Button from "../../components/ui/Button"
import { useNavigate } from "react-router-dom"
import { Toaster } from 'sonner';
import Card from "../../components/Inventory/Card"

const Inventory = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState("flavors")
  const [data, setData] = useState([])

  useEffect(() => {
    getItemByCategory(category)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error))
  }, [category])

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px] h-full" />
      <div className="flex flex-col flex-grow items-center relative">
        <Header category={category} setCategory={setCategory}/>
        <Toaster richColors/>
        {data ? (
          <div className="grid grid-cols-[auto,auto,auto] text-center py-8 items-center">

            <h1 className="border-2 border-primary py-2 min-w-[250px] font-bold bg-light">ITEM</h1>
            <h1 className="border-2 border-primary py-2 min-w-[250px] font-bold bg-light">IN STOCK</h1>
            <h1 className="font-bold text-center">Action</h1>

            {data && data.map((item) => (
              <Card key={item._id} item={item} setData={setData} data={data}/>
            ))}
          </div> ) : (
            <h1>Loading...</h1>
          )
        }

        <Button style='px-16 py-4 text-lg mt-16 fixed right-0 top-0 mt-3 mr-10 z-50' onClick={() => navigate("./add-item")}>Add Item</Button>
      </div>
    </div>
  )
}

export default Inventory