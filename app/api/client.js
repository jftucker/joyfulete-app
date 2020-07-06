import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";
import settings from "../config/settings";
import jwtDecode from "jwt-decode";

const apiClient = create({
  baseURL: settings.apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const accessToken = await authStorage.getAccessToken();
  if (!accessToken) return;
  request.headers["Authorization"] = "Bearer " + accessToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const accessToken = await authStorage.getAccessToken();

  if (jwtDecode(accessToken).exp < Date.now() / 1000) {
    const refresh = await authStorage.getRefreshToken();
    const newAccessToken = await apiClient.post(settings.refreshEndpoint, {
      refresh,
    });
    authStorage.storeAccessToken(newAccessToken.data.access);
  }

  const response = await get(url, params, axiosConfig);
  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default apiClient;
