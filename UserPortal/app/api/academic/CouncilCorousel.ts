import apiClient from "../apiClient";

export const getCouncilNotes = async () => {
  try {
    const response = await apiClient.get("/council-corousel");
    return response.data;
  } catch {
    return { data: [] };
  }
};