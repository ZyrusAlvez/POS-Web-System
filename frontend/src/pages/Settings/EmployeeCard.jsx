import SideBar from "../../layout/SideBar";
import Header from "../../components/Header";
import Button from "../../components/ui/Button";
import { getUser } from "../../api/user";
import { toast, Toaster } from "sonner";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { resetSales } from "../../api/user";

const EmployeeCard = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getUser(id)
      .then((data) => setUser(data))
      .catch((error) => toast.error(error.message));
  }, [handleReset]);

  function handleReset() {
    resetSales(id)
      .then(() => toast.success("Sales reset"))
      .catch((error) => toast.error(error.message));
  }

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col flex-grow items-center">
        <Header />
        <Toaster richColors />
        <div className="flex flex-col rounded-[2rem] bg-primary w-[90%] gap-6 text-2xl p-4 ">
          <h1 className="text-start">VIEW EMPLOYEE STATUS</h1>
          <div className="w-full flex flex-col items-center gap-2 font-bold">
            <h1 className="capitalize text-5xl">
              {user?.fullname?.surname}, {user?.fullname?.firstname}{" "}
              {user?.fullname?.middleInitial}.
            </h1>
            <h1>NAME</h1>
          </div>
          <div className="w-full rounded-full bg-white flex justify-between p-4">
            <h1 className="ml-4 text-base">TOTAL SALES</h1>
            <h1 className="mr-4 text-5xl font-bold">₱ {user?.sales}</h1>
          </div>
          <div className="w-full flex justify-end">
            <Button style="p-2 px-8" onClick={handleReset}>
              RESET
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
