import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfile, setCookies } from "@/services/authService";

export const useGetUser = () =>
  useQuery({
    queryKey: ["get-user"],
    queryFn: getUserProfile,
    retry: false,
    refetchOnWindowFocus: false,
  });
