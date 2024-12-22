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