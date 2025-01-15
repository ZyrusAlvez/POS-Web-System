import axios from "axios";

const url = "https://pos-web-system-3.onrender.com/api/inventory";

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
export async function decrementByName(data) {
  try {
    const response = await axios
      .put(`${url}/decrement-by-name`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function updateStock(id, data, name) {
  try{
    const response = await axios.put(`${url}/update-by-id/${id}`, {amount: data, name})
    return response.data
  }catch(error){
    console.log(error)
    throw error
  }
}