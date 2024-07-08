import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/categoriesService";

export const useGetAllCategories = () =>
  useQuery({
    queryKey: ["get-categories"],
    queryFn: getAllCategories,
    retry: false,
    refetchOnWindowFocus: false,
  });
