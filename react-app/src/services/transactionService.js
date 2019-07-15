import http from "./httpService";

const apiEndpoint = "http://localhost:3900/api/transactions";

export function send({ _id: user1 }, { _id: user2 }, amount) {
  return http.post(apiEndpoint, {
    userId: user1,
    user2Id: user2,
    amount
  });
}

export function spend({ _id: id }, description, amount) {
  return http.post(apiEndpoint, {
    userId: id,
    description,
    amount
  });
}
