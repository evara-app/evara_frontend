import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllCategories,
  getPropertiesListing,
} from "@/services/categoriesService";

export const useGetAllCategories = () =>
  useQuery({
    queryKey: ["get-categories"],
    queryFn: getAllCategories,
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useGetPropertiesListing = () =>
  useQuery({
    queryKey: ["get-property-listing"],
    queryFn: getPropertiesListing,
    retry: false,
    refetchOnWindowFocus: false,
  });
