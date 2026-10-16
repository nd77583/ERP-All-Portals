import apiClient from "../apiClient";

export const getDualCards = async () => {
  try {
    const response = await apiClient.get("/dual-section-cards");
    return response.data;
  } catch {
    return { data: [] };
  }
};