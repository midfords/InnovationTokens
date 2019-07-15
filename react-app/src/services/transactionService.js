import http from "./httpService";

const apiEndpoint = "http://localhost:3900/api/transactions";

export function send({ _id: recipientId }, amount) {
  return http.post(`${apiEndpoint}/send`, {
    recipient: recipientId,
    amount
  });
}

export function spend(message, amount) {
  return http.post(`${apiEndpoint}/spend`, {
    message,
    amount
  });
}
