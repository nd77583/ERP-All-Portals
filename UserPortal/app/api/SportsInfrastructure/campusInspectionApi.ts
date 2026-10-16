import apiClient from "../apiClient";

export const getCampusInspection = async () => {
  try {
    const response = await apiClient.get("/campus_inspection");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch campus inspection:", error);
    return [];
  }
};