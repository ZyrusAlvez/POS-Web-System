import SideBar from "../../layout/SideBar";
import { Toaster } from "sonner";
import { getItemByCategory } from "../../api/inventory";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

const AddIngredients = () => {
  const [flavors, setFlavors] = useState([]);
  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [fruitTea, setFruitTea] = useState([]);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    getItemByCategory("flavors").then((res) => setFlavors(res.data));
    getItemByCategory("products").then((res) => setProducts(res.data));
    getItemByCategory("materials").then((res) => setMaterials(res.data));
    getItemByCategory("fruit_tea").then((res) => setFruitTea(res.data));
  }, []);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col flex-grow items-center ">
        <Toaster richColors />
        <Header title="Add Ingredients" nav="/settings/add-product" />
        <div className="flex cursor-pointer bg-light my-4">

          <div className="flex flex-col border-r-2 border-dark">
            <h1 className="bg-primary px-4 py-2 text-center font-bold text-lg">
              Flavors
            </h1>
            {flavors.map((flavor) => (
              <h1
                key={flavor._id}
                className={`w-full px-4 py-1 ${
                  selectedIngredients.includes(flavor._id) && "bg-primary"
                }`}
                onClick={() => {
                  selectedIngredients.includes(flavor._id) ? 
                  setSelectedIngredients(selectedIngredients.filter((e) => e !== flavor._id)) :
                  setSelectedIngredients([...selectedIngredients, flavor._id])
                }}
              >
                {flavor.name}
              </h1>
            ))}
          </div>

          <div className="flex flex-col border-r-2 border-dark">
            <h1 className="bg-primary px-4 py-2 text-center font-bold text-lg">
              Product
            </h1>
            {products.map((product) => (
              <h1 key={product._id} className="w-full bg-light px-4 py-1 ">
                {product.name}
              </h1>
            ))}
          </div>

          <div className="flex flex-col border-r-2 border-dark">
            <h1 className="bg-primary px-4 py-2 text-center font-bold text-lg">
              Material
            </h1>
            {materials.map((material) => (
              <h1 key={material._id} className="w-full bg-light px-4 py-1 ">
                {material.name}
              </h1>
            ))}
          </div>

          <div className="flex flex-col">
            <h1 className="bg-primary px-4 py-2 text-center font-bold text-lg">
              Fruit Tea
            </h1>
            {fruitTea.map((e) => (
              <h1 key={e._id} className="w-full bg-light px-4 py-1 ">
                {e.name}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIngredients;
