const Header = ({ category, setCategory }) => {

  return (
    <div className="flex gap-4 font-bold flex-wrap justify-center mt-4 z-0">
      <div
        className={`w-auto p-4 bg-primary rounded-xl flex items-center cursor-pointer ${
          category === "flavors" ? "shadow-hard" : ""
        }`}
        onClick={() => setCategory("flavors")}
      >
        Flavors
      </div>
      <div
        className={`w-auto p-4 bg-primary rounded-xl flex items-center cursor-pointer ${
          category === "products" ? "shadow-hard" : ""
        }`}
        onClick={() => setCategory("products")}
      >
        Products
      </div>
      <div
        className={`w-auto p-4 bg-primary rounded-xl flex items-center cursor-pointer ${
          category === "materials" ? "shadow-hard" : ""
        }`}
        onClick={() => setCategory("materials")}
      >
        Materials
      </div>
      <div
        className={`w-auto p-4 bg-primary rounded-xl flex items-center cursor-pointer ${
          category === "fruit_tea" ? "shadow-hard" : ""
        }`}
        onClick={() => setCategory("fruit_tea")}
      >
        Fruit Tea
      </div>
    </div>
  );
};

export default Header;
