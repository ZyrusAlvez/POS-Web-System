import SideBar from "../../layout/SideBar"
import Header from "../../components/Inventory/Header"
import Button from "../../components/ui/Button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Inventory = () => {
  const [category, setCategory] = useState("flavors")
  const navigate = useNavigate()

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