import axios from "axios";

const url = "https://pos-web-system-3.onrender.com/api/product";

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

export async function deleteItem(id) {
  try {
    const response = await axios
      .delete(`${url}/delete-by-id/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addItem(data) {
  try {
    const response = await axios
      .post(`${url}/add-item`, data);
    return response.data
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
}