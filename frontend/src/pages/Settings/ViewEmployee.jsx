import SideBar from "../../layout/SideBar";
import Header from "../../components/Header";
import Button from "../../components/ui/Button";
import { getAllUsers } from "../../api/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewEmployee = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col flex-grow items-center ">
        <Header />

        <div className="flex flex-col items-center rounded-[2rem] bg-primary w-[90%] font-bold gap-4 text-xl py-4">
          <h1>EMPLOYEES</h1>
          {users.map((e, i) => (
            <div
              key={i}
              className="bg-white w-[90%] rounded-full px-4 py-2 flex justify-between items-center"
            >
              <h1>{e.username}</h1>
              <Button
                style="px-4 py-2 font-normal text-sm font-bold"
                onClick={() => navigate(`./${e._id}`)}
              >
                View
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
