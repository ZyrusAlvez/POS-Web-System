import productModel from "../model/productModel.mjs";

const productController = {
  // Add an item to the database
  addItem: async (req, res) => {
    try {
      const { name, classification, price16oz, price22oz } = req.body;

      // Create a new item
      const newItem = await productModel.create({ name, classification, price16oz, price22oz });

      res.status(201).send({ message: "Item added successfully", item: newItem });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  // Get an item based on its name
  getItemByName: async (req, res) => {
    try {
      const { name } = req.params;

      // Find the item by name
      const item = await productModel.findOne({ name }); // Query by name

      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }

      res.status(200).send(item);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  // Find items based on their classification
  getItemByClassification: async (req, res) => {
    try {
      const { classification } = req.params;

      // Find items with the given classification
      const items = await productModel.find({ classification });

      if (items.length === 0) {
        return res.status(404).send({ message: "No items found for this classification" });
      }

      res.status(200).send(items);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  // Delete an item by name
  deleteItemByName: async (req, res) => {
    try {
      const { name } = req.params;

      // Find and delete the item
      const deletedItem = await productModel.findOneAndDelete({ name });

      if (!deletedItem) {
        return res.status(404).send({ message: "Item not found" });
      }

      res.status(200).send(deletedItem);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
};

export default productController;