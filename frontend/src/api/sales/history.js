import axios from "axios";

const url = "http://localhost:3000/api/sales/history";

export async function getByDate(date) {
  try {
    const response = await axios
      .get(`${url}/get-by-date/${date}`);
    return response.data;
  }catch(error){
    throw error.response.data;
  }
}

export async function addItem(data) {
  try {
    const response = await axios
      .post(`${url}/add-item/`, data);
    return response.data;
  }catch(error){
    throw error.response.data;
  }
}