import logo from "../assets/logo.png"
import { useLocation } from 'react-router-dom';
import { BiSolidFoodMenu } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { MdOutlineInventory } from "react-icons/md";
import { RiSettingsFill } from "react-icons/ri";
import SidebarButton from "../components/ui/SidebarButton";

const SideBar = () => {
  const location = useLocation();
  console.log(location.pathname)
  return (
    <div className='flex flex-col gap-12 bg-red h-screen fixed w-[15%] bg-primary items-center min-w-[150px]'>
      <img src={logo}/>
      <SidebarButton name={"Menu"} icon={<BiSolidFoodMenu/>} url={"/"}/>
      <SidebarButton name={"Sales"} icon={<GoGraph/>} url={"/sales"}/>
      <SidebarButton name={"Inventory"} icon={<MdOutlineInventory/>} url={"/inventory"}/>
      <SidebarButton name={"Settings"} icon={<RiSettingsFill/>} url={"/settings"}/>
    </div>
  )
}

export default SideBar