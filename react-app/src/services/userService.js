import http from "./httpService";
import config from "../config.json";

const apiEndpoint = `${config.apiUrl}/users`;

function me() {
  return http.get(`${apiEndpoint}/me`);
}

function register(user) {
  return http.post(apiEndpoint, {
    first: user.first,
    last: user.last,
    email: user.email,
    password: user.password,
    profileId: user.profileId,
    managerId: user.managerId
  });
}

function userLookup(query) {
  return http.get(`${apiEndpoint}?query=${query}`);
}

function managerLookup(query) {
  return http.get(`${apiEndpoint}/managers?query=${query}`);
}

function findById(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

export default {
  me: me,
  register: register,
  userLookup: userLookup,
  managerLookup: managerLookup,
  findById: findById
};
