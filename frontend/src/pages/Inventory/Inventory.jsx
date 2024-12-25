import SideBar from "../../layout/SideBar"
import Header from "../../components/Inventory/Header"
import { useState, useEffect } from "react"
import { getItemByCategory } from "../../api/inventory"
import Button from "../../components/ui/Button"

const Inventory = () => {
  const [category, setCategory] = useState("flavors")

  useEffect(() => {
    getItemByCategory("flavors")
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col flex-grow items-center ">
        <Header category={category} setCategory={setCategory}/>
        <Button style='px-16 py-4 text-lg mt-16' onClick={() => navigate("./add-item")}>Add Item</Button>
      </div>
    </div>
  )
}

export default Inventory