import apiClient from "../apiClient";

const normalizeNotices = (payload: unknown) => {
  if (Array.isArray(payload)) return payload;

  if (payload && typeof payload === "object") {
    const candidate = payload as Record<string, unknown>;

    for (const key of ["notices", "data", "results", "items"]) {
      const value = candidate[key];
      if (Array.isArray(value)) return value;
    }
  }

  return [];
};

export const getNotices = async () => {
  const response = await apiClient.get("/notices_Board");
  return normalizeNotices(response.data);
};