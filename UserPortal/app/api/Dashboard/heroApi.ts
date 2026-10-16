import apiClient from "../apiClient";

export const getHeroContent = async () => {
  const response = await apiClient.get("/main_head")
  return response.data;
};

export const getFeatureCardData = async () => {
  const response = await apiClient.get("/feature_Card")
  return response.data;
};

export const getHeroStats = async () => {
  const response = await apiClient.get("/dashboard_metrics");
  return response.data;
};

export const getAdmissionsPhone = async () => {
  const response = await apiClient.get("/admission_contacts");
  return response.data;
};