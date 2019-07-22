import http from "./httpService";
import config from "../config.json";

const apiEndpoint = `${config.apiUrl}/feed`;

function get() {
  return http.get(`${apiEndpoint}`);
}

export default {
  get: get
};
