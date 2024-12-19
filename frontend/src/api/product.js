import axios from "axios";

const url = "http://localhost:3000/api/product";

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