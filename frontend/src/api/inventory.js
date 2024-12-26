import axios from "axios";

const url = "http://localhost:3000/api/inventory";

export async function addItem(item) {
  try {
    const response = await axios
      .post(`${url}/add-item`, item);
    return response.data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
}

export async function deleteItem(id) {
  try {
    const response = await axios
      .delete(`${url}/delete-by-id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}


export async function getItemByCategory(category) {
  try {
    const response = await axios
      .get(`${url}/get-by-category/${category}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}