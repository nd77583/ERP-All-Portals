import apiClient from "../apiClient";

export const submitAdmissionLead = async (formData: any) => {
  const response = await apiClient.post("/admission_leads", formData);
  return response.data;
}

export const getFrontDeskData = async () => {
  const response = await apiClient.get("/front-desk/options");
  return response.data;
}

export const getAdmissionContacts = async () => {
  const res = await apiClient.get("/admission_contacts");
  return res.data;
};
