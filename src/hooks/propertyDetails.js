import { useQuery } from "@tanstack/react-query";
import { getRooms, getCountries } from "@/services/addProperty";

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
