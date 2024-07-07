import { useQuery } from "@tanstack/react-query";
import {
  getRooms,
  getCountries,
  getPropertyFields,
} from "@/services/addProperty";

import { getAllProvinces, getAllCities } from "@/services/properties";

export const useGetRooms = () =>
  useQuery({
    queryKey: ["get-rooms"],
    queryFn: getRooms,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetCountry = () =>
  useQuery({
    queryKey: ["get-countries"],
    queryFn: getCountries,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetAllProvince = () =>
  useQuery({
    queryKey: ["get-all-province"],
    queryFn: getAllProvinces,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetAllCities = () =>
  useQuery({
    queryKey: ["get-all-cities"],
    queryFn: getAllCities,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetPropertyFields = () =>
  useQuery({
    queryKey: ["get-property-fields"],
    queryFn: getPropertyFields,
    retry: false,
    refetchOnWindowFocus: true,
  });
