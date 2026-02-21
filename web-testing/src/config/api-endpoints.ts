export const API_USER_CONFIG = {
  BASE_URL: "https://jsonplaceholder.typicode.com",

  ENDPOINTS: {
    GET_ALL: "/users",
    GET_BY_ID: (id: number) => `/users/${id}`,
  },
};

export const API_PRODUCT_CONFIG = {
  BASE_URL: "https://api.demoblaze.com",
  HOST: "api.demoblaze.com",

  ENDPOINTS: {
    LOGIN: "/login",
    ADD_TO_CART: "/addtocart",
    DELETE_ITEM: "/deleteitem",
  },
};
