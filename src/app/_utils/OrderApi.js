import axiosClient from "./AxiosClient";

const createOrder = (data) => axiosClient.post("/orders", data);

const orderApi = {
  createOrder,
};

export default orderApi;