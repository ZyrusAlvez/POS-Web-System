import SideBar from "../../layout/SideBar"
import Header from "../../components/Settings/Header"

const AddProduct = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col flex-grow items-center ">
        <Header/>
      </div>
    </div>
  )
}

export default AddProduct