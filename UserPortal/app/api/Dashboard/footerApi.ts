import apiClient from "../apiClient";

export type FooterContacts = {
  location: string;
  registrarMobile: string;
  antiRaggingTollFree: string;
};

const normalizeFooterContacts = (payload: unknown): FooterContacts => {
  if (payload && typeof payload === "object") {
    const candidate = payload as Record<string, unknown>;

    if (Array.isArray(candidate.data)) {
      return normalizeFooterContacts(candidate.data[0]);
    }

    if (
      typeof candidate.location === "string" &&
      typeof candidate.registrarMobile === "string" &&
      typeof candidate.antiRaggingTollFree === "string"
    ) {
      return {
        location: candidate.location,
        registrarMobile: candidate.registrarMobile,
        antiRaggingTollFree: candidate.antiRaggingTollFree,
      };
    }
  }

  throw new Error("Footer contacts API returned an unexpected response.");
};

export const getFooterContacts = async (): Promise<FooterContacts> => {
  const response = await apiClient.get("/footer-contact-details");
  return normalizeFooterContacts(response.data);
};