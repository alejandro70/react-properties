import config from "config";
import { fetchWrapper } from "@/_helpers";

const baseUrl = `${config.apiUrl}/api/login`;

export const loginService = {
  login,
};

function login(params) {
  return fetchWrapper.post(baseUrl, params);
}
