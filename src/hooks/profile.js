import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllUserProperties } from "@/services/profile";

export const useGetUserAllProperties = () =>
  useQuery({
    queryKey: ["get-user-properties"],
    queryFn: getAllUserProperties,
    retry: false,
    refetchOnWindowFocus: false,
  });
