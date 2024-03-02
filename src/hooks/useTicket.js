import { sendTicket, getAllTickets } from "@/services/ticketService";
import { useMutation, useQuery } from "@tanstack/react-query";

// send ticket react query hook
export const useSendTicket = () =>
  useMutation({
    mutationFn: sendTicket,
  });

// get all tickets react query hook
export const useGetAllTickets = () =>
  useQuery({
    queryKey: ["get-tickets"],
    queryFn: getAllTickets,
    retry: false,
    refetchOnWindowFocus: true,
  });
