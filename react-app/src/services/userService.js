import http from "./httpService";

const apiEndpoint = "http://localhost:3900/api/users";

export function register(user) {
  return http.post(apiEndpoint, {
    first: user.first,
    last: user.last,
    email: user.email,
    password: user.password,
    profileId: user.profileId,
    managerId: user.managerId
  });
}
