
import axiosClient from "./AxiosClient";
const addToCart = (payload) => axiosClient.post("/carts", payload);
const getUserCartItems = (email) =>
  axiosClient.get(
    `carts?populate[products][populate]=banners&filters[email][$eq]=${email}`
  );
const deleteCartItem = (id) => axiosClient.delete(`/carts/${id}`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {addToCart,getUserCartItems ,deleteCartItem};
