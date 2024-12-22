import addonModel from "../model/addonModel.mjs";

const addonControl = {
  addItem : async (req, res) => {
    try {
      const { name, price, ingredients } = req.body;

      const newItem = await addonModel.create({ name, price, ingredients });

      res.status(201).send({ message: "Item added successfully", data: newItem });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  getAllItems : async (req, res) => {
    try {
      const items = await addonModel.find();

      if (items.length === 0) {
        return res.status(404).send({ message: "No items found" });
      }

      res.status(200).send({ message: "Items found", data: items });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  getItemById : async (req, res) => {
    try {
      const { _id } = req.params;

      const item = await addonModel.findOne({ _id });

      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }

      res.status(200).send({ message: "Item found", data: item });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;

      const item = await addonModel.findByIdAndDelete(id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      res.status(200).json({ message: 'Item deleted successfully', item });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
}

export default addonControl;