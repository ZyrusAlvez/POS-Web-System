import SideBar from "../../layout/SideBar"
import { Toaster } from "sonner"

const AddIngredients = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col flex-grow items-center ">
        <Toaster richColors />

      </div>
    </div>
  )
}

export default AddIngredients