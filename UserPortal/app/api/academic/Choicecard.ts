import apiClient from "../apiClient";

export const getChoiceCards = async () => {
  try {
    const response = await apiClient.get("/curricular-matrix-cards");
    return response.data;
  } catch {
    return [];
  }
};