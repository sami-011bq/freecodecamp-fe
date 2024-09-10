import axios from "axios";
import Cookies from "js-cookie";
import { endpoints } from "./endpoints";

const logoutUserWithoutAPI = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

export const API_ROOT = process.env.NEXT_PUBLIC_API_URL;
const TIMEOUT = 60000;

const http = (baseURL = API_ROOT, timeout = TIMEOUT) => {
  const headers = {
    "Content-Type": "application/json",
  };

  // Fetch the access token from cookies
  const accessToken = Cookies.get("accessToken");
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  const client = axios.create({
    baseURL,
    // timeout,
    headers,
    withCredentials: true,
  });

  // Intercept response object to handle success and error
  client.interceptors.response.use(handleSuccess, handleError);

  function handleSuccess(response) {
    return response;
  }

  async function handleError(error) {
    // Ensure error.response exists
    if (!error.response) {
      return Promise.reject(error);
    }

    // Access token is expired or invalid, refresh the token
    if (error.response.status === 401) {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        logoutUserWithoutAPI();
        return Promise.reject(error);
      }

      try {
        // Refresh the access token
        const response = await axios.post(
          `${API_ROOT}${endpoints.auth.token}`,
          {
            refreshToken,
          }
        );

        const { accessToken: newAccessToken, accessTokenExpiry } =
          response.data;

        // Update the access token in the headers and cookies
        Cookies.set("accessToken", newAccessToken, {
          expires: new Date(new Date().getTime() + accessTokenExpiry),
        });
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new access token
        return client(error.config);
      } catch (refreshError) {
        if (refreshError.response?.status === 401) {
          // Refresh token is expired or invalid, logout the user
          logoutUserWithoutAPI();
        } else {
          console.error("Error refreshing token:", refreshError);
        }
        return Promise.reject(refreshError);
      }
    }

    // Handle other specific status codes
    if (error.response.status === 400) {
      console.error("Wrong request:", error.response.data?.message);
    }

    if (error.response.status === 403) {
      console.error("Forbidden access:", error.response.data?.message);
    }

    // Reject with the appropriate error response data
    return Promise.reject(error.response?.data || error);
  }

  // HTTP method wrappers
  const get = async (path) =>
    client.get(path).then((response) => response.data);
  const post = async (path, payload) =>
    client.post(path, payload).then((response) => response.data);
  const put = async (path, payload) =>
    client.put(path, payload).then((response) => response.data);
  const patch = async (path, payload) =>
    client.patch(path, payload).then((response) => response.data);
  const _delete = async (path, data) => {
    if (data) {
      return client.delete(path, { data }).then((response) => response.data);
    }
    return client.delete(path).then((response) => response.data);
  };

  return {
    get,
    post,
    put,
    patch,
    delete: _delete,
  };
};

export default http;
