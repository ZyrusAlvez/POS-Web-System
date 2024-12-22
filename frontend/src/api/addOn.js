import axios from "axios";

const url = "http://localhost:3000/api/add-on";

export async function getAllItems() {
  try {
    const response = await axios
      .get(`${url}/get-all-items`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteAddOn(id) {
  try {
    const response = await axios
      .delete(`${url}/delete-item/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}