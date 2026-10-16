import apiClient from "../apiClient";

export const getDossierCards = async () => {
  try {
  const response = await apiClient.get("/dossierCards");
  return response.data;
   } catch {
    return [];
  }
};