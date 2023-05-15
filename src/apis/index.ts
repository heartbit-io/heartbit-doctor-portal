import axios from "axios";

export const api: any = axios.create({
  baseURL: "https://dev-wallet-api.heartbit.io/api/v1/",
});
