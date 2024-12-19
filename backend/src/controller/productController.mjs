import productModel from "../model/productModel.mjs";

const productController = {
  // Add an item to the database
  addItem: async (req, res) => {
    try {
      const { name, category, price_16oz, price_22oz, ingredients_16oz, ingredients_22oz} = req.body;

      // Create a new item
      const newItem = await productModel.create({ name, category, price_16oz, price_22oz, ingredients_16oz, ingredients_22oz});

      res.status(201).send({ message: "Item added successfully", data: newItem });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  // Get an item based on its name
  getItemById: async (req, res) => {
    try {
      const { _id } = req.params;

      // Find the item by name
      const item = await productModel.findOne({ _id }); // Query by name

      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }

      res.status(200).send({ message: "Item found", data: item });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  // Find items based on their classification
  getItemByCategory: async (req, res) => {
    try {
      const { category } = req.params;

      // Find items with the given classification
      const items = await productModel.find({ category });

      if (items.length === 0) {
        return res.status(404).send({ message: "No items found for this classification" });
      }

      res.status(200).send({ message: "Items found", data: items });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  // Delete an item by name
  deleteItemById: async (req, res) => {
    try {
      const { _id } = req.params;

      // Find and delete the item
      const deletedItem = await productModel.findOneAndDelete({ _id });

      if (!deletedItem) {
        return res.status(404).send({ message: "Item not found" });
      }

      res.status(200).send({ message: "Item deleted", data: deletedItem });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
};

export default productController;