import { useNavigate } from "react-router-dom";

const Header = ({ category, setCategory }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 font-bold flex-wrap justify-center">
      <div
        className={`w-auto p-4 bg-primary rounded-xl flex items-center cursor-pointer ${
          category === "flavors" ? "shadow-hard" : ""
        }`}
        onClick={() => {
          setCategory("flavors");
          navigate("/inventory/flavors");
        }}
      >
        Flavors
      </div>
      <div
        className={`w-auto p-4 bg-primary rounded-xl flex items-center cursor-pointer ${
          category === "products" ? "shadow-hard" : ""
        }`}
        onClick={() => {
          setCategory("products");
          navigate("/inventory/products");
        }}
      >
        Products
      </div>
      <div
        className={`w-auto p-4 bg-primary rounded-xl flex items-center cursor-pointer ${
          category === "materials" ? "shadow-hard" : ""
        }`}
        onClick={() => {
          setCategory("materials");
          navigate("/inventory/materials");
        }}
      >
        Materials
      </div>
      <div
        className={`w-auto p-4 bg-primary rounded-xl flex items-center cursor-pointer ${
          category === "fruit_tea" ? "shadow-hard" : ""
        }`}
        onClick={() => {
          setCategory("fruit_tea");
          navigate("/inventory/fruit-tea");
        }}
      >
        Fruit Tea
      </div>
    </div>
  );
};

export default Header;
