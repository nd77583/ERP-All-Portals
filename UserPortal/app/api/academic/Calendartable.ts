import apiClient from "../apiClient";

export const getCourseCards = async () => {
  const response = await apiClient.get("/api/course_cards");
  return response.data;
};