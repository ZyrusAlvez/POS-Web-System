import historyModel from "../../model/sales/historyModel.mjs";

const historyController = {
  addItem: async (req, res) => {
    try {
      const { billing, date, time } = req.body;

      // Create a new item
      const newItem = await historyModel.create({ billing, date, time });

      res.status(201).send({ message: "Transaction added to the history", data: newItem });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  getByDate: async (req, res) => {
    try {
      const { date } = req.params; // Get the date from the query parameters

      const items = await historyModel.find({date});
      res.status(200).send({ message: "All transactions retrieved", data: items });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

export default historyController;