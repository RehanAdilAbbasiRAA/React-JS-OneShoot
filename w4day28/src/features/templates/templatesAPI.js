import axios from "axios";

const API_URL = "http://localhost:8000";

export const getTemplates = async () => {
  const response = await axios.get(`${API_URL}/templates`);
  return response.data;
};
