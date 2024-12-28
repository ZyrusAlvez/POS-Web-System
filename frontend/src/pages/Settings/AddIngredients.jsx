import SideBar from "../../layout/SideBar";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { getItemByCategory } from "../../api/inventory";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Button from "../../components/ui/Button";

const AddIngredients = ({selectedIngredients, setSelectedIngredients}) => {
  const navigate = useNavigate();
  const [flavors, setFlavors] = useState([]);
  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [fruitTea, setFruitTea] = useState([]);

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
      <div className="flex flex-col flex-grow items-center relative">
        <Toaster richColors />
        <Header title="Add Ingredients" nav="/settings/add-product" />
        <div className="flex cursor-pointer bg-light my-4">
          <div className="flex flex-col border-r-2 border-dark">
            <h1 className="bg-primary px-4 py-2 text-center font-bold text-lg">
              Flavors
            </h1>
            {flavors.map((flavor) => (
              <h1
                key={flavor.name}
                className={`w-full px-4 py-1 ${
                  selectedIngredients.includes(flavor.name) && "bg-primary"
                }`}
                onClick={() => {
                  selectedIngredients.includes(flavor.name)
                    ? setSelectedIngredients(
                        selectedIngredients.filter((e) => e !== flavor.name)
                      )
                    : setSelectedIngredients([
                        ...selectedIngredients,
                        flavor.name,
                      ]);
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
              <h1
                key={product.name}
                className={`w-full px-4 py-1 ${
                  selectedIngredients.includes(product.name) && "bg-primary"
                }`}
                onClick={() => {
                  selectedIngredients.includes(product.name)
                    ? setSelectedIngredients(
                        selectedIngredients.filter((e) => e !== product.name)
                      )
                    : setSelectedIngredients([
                        ...selectedIngredients,
                        product.name,
                      ]);
                }}
              >
                {product.name}
              </h1>
            ))}
          </div>

          <div className="flex flex-col border-r-2 border-dark">
            <h1 className="bg-primary px-4 py-2 text-center font-bold text-lg">
              Material
            </h1>
            {materials.map((material) => (
              <h1
                className={`w-full px-4 py-1 ${
                  selectedIngredients.includes(material.name) && "bg-primary"
                }`}
                onClick={() => {
                  selectedIngredients.includes(material.name)
                    ? setSelectedIngredients(
                        selectedIngredients.filter((e) => e !== material.name)
                      )
                    : setSelectedIngredients([
                        ...selectedIngredients,
                        material.name,
                      ]);
                }}
              >
                {material.name}
              </h1>
            ))}
          </div>

          <div className="flex flex-col">
            <h1 className="bg-primary px-4 py-2 text-center font-bold text-lg">
              Fruit Tea
            </h1>
            {fruitTea.map((e) => (
              <h1
                className={`w-full px-4 py-1 ${
                  selectedIngredients.includes(e.name)
                    ? "bg-primary"
                    : "bg-light"
                }`}
                onClick={() => {
                  selectedIngredients.includes(e.name)
                    ? setSelectedIngredients(
                        selectedIngredients.filter(
                          (ingredient) => ingredient !== e.name
                        )
                      )
                    : setSelectedIngredients([...selectedIngredients, e.name]);
                }}
              >
                {e.name}
              </h1>
            ))}
          </div>
        </div>

        <Button style="px-8 py-2 fixed right-0 bottom-0 mr-4 mb-4" onClick={() => navigate("/settings/add-product")}>Done</Button>
      </div>
    </div>
  );
};

export default AddIngredients;
