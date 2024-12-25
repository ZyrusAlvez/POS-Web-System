import SideBar from "../../layout/SideBar"
import Header from "../../components/Inventory/Header"
import { useState } from "react"

const Products = () => {
  const [category, setCategory] = useState("flavors")

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col flex-grow items-center ">
        <Header category={category} setCategory={setCategory}/>
      </div>
    </div>
  )
}

export default Products