import { useQuery } from "@tanstack/react-query";
import { getCurrency } from "@/services/common";

export const useGetCurrency = () =>
  useQuery({
    queryKey: ["get-currency"],
    queryFn: getCurrency,
    retry: false,
    refetchOnWindowFocus: true,
  });

// react query for update live currency from localstorage
export const useGetLocalCurrency = () =>
  useQuery({
    queryKey: ["get-live-currency"],
    queryFn: () => {
      return localStorage.getItem("currency");
    },
  });
