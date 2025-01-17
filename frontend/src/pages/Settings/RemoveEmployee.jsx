import SideBar from "../../layout/SideBar";
import Header from "../../components/Header";
import { useState, useEffect, useContext } from "react";
import { getAllUsers, removeUser } from "../../api/user";
import Button from "../../components/ui/Button";
import AuthContext from "../../context/AuthContext";
import { toast, Toaster } from "sonner";

const RemoveEmployee = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  function handleRemove(id) {
    if (id === user?.id) {
      toast.error("You cannot remove yourself");
    } else {
      removeUser(id)
        .then(() => {
          setUsers(users.filter((e) => e._id !== id));
          toast.success("Employee removed");
        })
        .catch((error) => toast.error(error.message));
    }
  }

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col flex-grow items-center ">
        <Header />
        <Toaster richColors />
        <div className="flex flex-col items-center rounded-[2rem] bg-primary w-[90%] font-bold gap-4 text-xl py-4">
          <h1>REMOVE EMPLOYEE</h1>
          {users.map((e, i) => (
            <div
              key={i}
              className="bg-white w-[90%] rounded-full px-4 py-2 flex justify-between items-center"
            >
              <h1>{e.username}</h1>
              <Button
                style="px-8 py-2 text-sm bg-red-800"
                onClick={() => handleRemove(e._id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RemoveEmployee;
