import http from "./httpService";
import config from "../config.json";

const apiEndpoint = `${config.apiUrl}/transactions`;

function send({ recipientId, amount }) {
  return http.post(`${apiEndpoint}/send`, {
    recipientId,
    amount
  });
}

function spend({ message, amount }) {
  return http.post(`${apiEndpoint}/spend`, {
    message,
    amount
  });
}

export default {
  send: send,
  spend: spend
};
