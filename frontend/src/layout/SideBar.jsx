import logo from "../assets/logo.png"
import { BiSolidFoodMenu } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { MdOutlineInventory } from "react-icons/md";
import { RiSettingsFill } from "react-icons/ri";
import SidebarButton from "../components/ui/SidebarButton";
import { Toaster } from 'sonner'

const SideBar = () => {
  return (
    <div className='flex flex-col gap-12 bg-red h-screen w-[15vw] bg-primary items-center min-w-[150px] fixed'>
      <img src={logo}/>
      <SidebarButton name={"Menu"} icon={<BiSolidFoodMenu/>} url={"/"}/>
      <SidebarButton name={"Sales"} icon={<GoGraph/>} url={"/sales"}/>
      <SidebarButton name={"Inventory"} icon={<MdOutlineInventory/>} url={"/inventory/flavors"}/>
      <SidebarButton name={"Settings"} icon={<RiSettingsFill/>} url={"/settings"}/>
      <Toaster richColors/>
    </div>
  )
}

export default SideBar