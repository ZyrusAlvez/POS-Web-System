import SideBar from "../../layout/SideBar";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col items-center justify-start flex-grow gap-8 mt-4">
        <h1 className="text-4xl w-full text-start font-bold pl-4">SETTINGS</h1>
        <div className="h-auto w-[80%] bg-primary rounded-[2rem] flex flex-col justify-center items-center gap-4 py-8">
          <h1 className="text-black text-lg font-bold">PRODUCTS</h1>
          <Button style={"w-[95%] p-2"} onClick={() => {navigate("./add-product")}}>ADD PRODUCT</Button>
          <Button style={"w-[95%] p-2"} onClick={() => {navigate("./remove-product")}}>REMOVE PRODUCT</Button>
        </div>
        <div className="h-auto w-[80%] bg-primary rounded-[2rem] flex flex-col justify-center items-center gap-4 py-8">
          <h1 className="text-black text-lg font-bold">EMPLOYEES</h1>
          <Button style={"w-[95%] p-2"} onClick={() => {navigate("./view-employees")}}>VIEW EMPLOYEES</Button>
          <Button style={"w-[95%] p-2"} onClick={() => {navigate("./add-employee")}}>ADD NEW EMPLOYEES</Button>
          <Button style={"w-[95%] p-2"}  onClick={() => {navigate("./remove-employee")}}>REMOVE EMPLOYEES</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
