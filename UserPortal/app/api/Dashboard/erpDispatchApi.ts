import apiClient from "../apiClient";

export const getErpNotices = async () => {
  const response = await apiClient.get("/erp_notices");
  return response.data;
};