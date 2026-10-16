import apiClient from "../apiClient";

export const getHeroSection = async () => {
  try {
    const response = await apiClient.get("/HeroSection");
    return response.data;
  } catch {
    return [];
  }
};
