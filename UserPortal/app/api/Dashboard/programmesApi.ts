import apiClient from "../apiClient";

export const getProgrammes = async () => {
  const response = await apiClient.get("/course_cards");
  return response.data;
};