import { useQuery } from "@tanstack/react-query";
import { getCurrency } from "@/services/common";

export const useGetCurrency = () =>
  useQuery({
    queryKey: ["get-currency"],
    queryFn: getCurrency,
    retry: false,
    refetchOnWindowFocus: true,
  });
