import api from "./api";

export const loginAdmin = (data) => {
  return api.post("/auth/login", data);
};