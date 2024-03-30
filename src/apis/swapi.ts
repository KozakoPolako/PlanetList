import axios from "axios";

const API_BASE = "https://swapi.dev/api";

export type SwapiPlanet = {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
};

type SwapiListResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type ListFetchOptions = {
  page: number;
  search: string;
};

export async function fetchPlanets(
  options: ListFetchOptions
): Promise<SwapiListResponse<SwapiPlanet>> {
  const response = await axios.get(`${API_BASE}/planets`, {
    params: {
      format: "json",
      page: options.page,
      search: options.search ? options.search : undefined
    }
  });

  return response.data;
}
