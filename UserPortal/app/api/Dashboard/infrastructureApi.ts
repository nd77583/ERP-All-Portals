import apiClient from "../apiClient";

const normalizeFacilities = (payload: unknown) => {
  if (Array.isArray(payload)) {
    return payload.map((facility, index) => {
      if (facility && typeof facility === "object") {
        const candidate = facility as Record<string, unknown>;
        const image = candidate.image;
        const imageUrl =
          typeof image === "string"
            ? image
            : image &&
                typeof image === "object" &&
                "url" in image &&
                typeof image.url === "string"
              ? image.url
              : "/infrastructure/default.svg";

        return {
          ...candidate,
          id: typeof candidate.id === "number" ? candidate.id : index + 1,
          image: { url: imageUrl },
          badge:
            typeof candidate.badge === "string"
              ? candidate.badge
              : "Facility",
          title:
            typeof candidate.title === "string"
              ? candidate.title
              : `Facility ${index + 1}`,
          description:
            typeof candidate.description === "string"
              ? candidate.description
              : "",
          isFeatured: Boolean(candidate.isFeatured),
        };
      }

      return {
        id: index + 1,
        image: { url: "/infrastructure/default.svg" },
        badge: "Facility",
        title: `Facility ${index + 1}`,
        description: "",
        isFeatured: false,
      };
    });
  }

  if (payload && typeof payload === "object") {
    const candidate = payload as Record<string, unknown>;

    for (const key of ["facilities", "data", "results", "items", "records"]) {
      const value = candidate[key];
      if (Array.isArray(value)) return normalizeFacilities(value);
    }
  }

  return [];
};

export const getInfrastructure = async () => {
  const response = await apiClient.get("/sport-facilities");
  return normalizeFacilities(response.data);
};