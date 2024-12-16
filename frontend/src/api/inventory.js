import axios from "axios";

const url = "http://localhost:3000/api/inventory";

export function addItem(name, amount, classification){
  axios
  .post(`${url}/add-item`, {name, amount, classification})
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
};

export function getImageByClassification (classification) {
  axios
  .get(`${url}/get-by-classification/${classification}`)
  .then((response) => {
    console.log(response.data)
    return response.data
  })
  .catch((error) => {
    console.log(error)
  })
}