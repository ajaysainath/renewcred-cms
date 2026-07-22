import api from "./api";

export const getStandards = () => {
  return api.get("/standards");
};

export const getStandard = (slug) => {
  return api.get(`/standards/${slug}`);
};