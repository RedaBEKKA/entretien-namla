import axios from "axios";

export default async function saveOrder(data) {
  var data = JSON.stringify(data);

  var config = {
    method: "post",
    url: "http://localhost:3000/orders/create",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  const response = await axios(config);
  const result = await response.data;
  return result;
}
