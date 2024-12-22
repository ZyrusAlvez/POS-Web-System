import axios from "axios";

const url = "http://localhost:3000/api/user";

export async function getAllUsers() {
  try {
    const response = await axios
      .get(`${url}/get-all-users`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function removeUser(id) {
  try {
    const response = await axios
      .delete(`${url}/delete-user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}