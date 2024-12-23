import SideBar from "../../layout/SideBar";
import Header from "../../components/Settings/Header";
import Category from "../../components/Category";
import Button from "../../components/ui/Button";
import { getItemByCategory, deleteItem } from "../../api/product";
import { getAllItems, deleteAddOn } from "../../api/addOn";
import { useEffect, useState } from "react";

const RemoveProduct = () => {
  const [category, setCategory] = useState("milktea");
  const [item, setItem] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (category === "add_ons") {
      getAllItems()
        .then((res) => setItem(res.data))
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    } else {
      getItemByCategory(category)
        .then((res) => setItem(res.data))
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    }
  }, [category, removeItem]);

  useEffect(() => {
    if (error) {
      setError(false);
    }
  }, [category]);

  function removeItem(id) {
    if (category === "add_ons") {
      deleteAddOn()
        .then((res) => console.log(`${res.data.name} removed successfully`))
        .catch((err) => console.log(err));
    } else {
      deleteItem(id)
        .then((res) => console.log(`${res.data.name} removed successfully`))
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />

      <div className="flex flex-col flex-grow items-center ">
        <Header />
        <Category category={category} setCategory={setCategory} />

        <div className="flex flex-col w-full gap-4 m-4 mt-8">
          {error ? (
            <h1 className="text-red-800 text-2xl font-bold w-full text-center mt-10">No Items Found!</h1>
          ) : (
            item.map((e, i) => (
              <div
                key={i}
                className="rounded-full flex justify-between border-black border-2 p-2 items-center mx-4 font-bold"
              >
                {e.name}
                <Button
                  style="text-white py-2 px-4 bg-red-800"
                  onClick={() => removeItem(e._id)}
                >
                  Remove
                </Button>
              </div>
            ))
          )}
          {}
        </div>
      </div>
    </div>
  );
};

export default RemoveProduct;
