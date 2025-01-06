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

export async function addUser(user) {
  try {
    const response = await axios
      .post(`${url}/register`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUser(id) {
  try {
    const response = await axios
      .get(`${url}/get-user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function resetSales(id) {
  try {
    const response = await axios
      .put(`${url}/reset-sales/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function addCashSales(id, amount) {
  try {
    const response = await axios
      .put(`${url}/add-cash-sales/${id}`, { amount });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function addGcashSales(id, amount) {
  try {
    const response = await axios
      .put(`${url}/add-gcash-sales/${id}`, { amount });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}