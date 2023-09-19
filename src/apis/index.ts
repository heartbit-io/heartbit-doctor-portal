import axios from "axios";

export const api: any = axios.create({
  baseURL: "http://3.39.148.234:8080/api/v1/",
  headers: {
    contentType: "application/json;charset=UTF-8",
  },
});
