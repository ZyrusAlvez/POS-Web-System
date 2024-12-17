import axios from "axios";

const url = "http://localhost:3000/api/inventory";

export async function addItem(name, amount, classification) {
  try {
    const response = await axios
      .post(`${url}/add-item`, { name, amount, classification });
    return response.data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
}


export async function getItemByClassification(classification) {
  try {
    const response = await axios
      .get(`${url}/get-by-classification/${classification}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}