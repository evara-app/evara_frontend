import http from "./httpService";

// send ticked request
export function sendTicket({ data }) {
  return http.post("/api/v2/front/ticket/", data);
}

// get all tickets
export function getAllTickets() {
  return http.get("/api/v2/front/ticket/").then(({ data }) => data);
}
