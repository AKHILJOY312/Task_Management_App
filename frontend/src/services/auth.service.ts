import api from "./api";
import { API_ROUTES } from "./apiRoutes.constants";

export const login = (credentials: { email: string; password: string }) => {
  const endpoint = API_ROUTES.AUTH.LOGIN;

  const { ...payload } = credentials;

  return api.post(endpoint, payload);
};

export const register = (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => api.post(API_ROUTES.AUTH.REGISTER, data);

export const loadMe = () => api.get(API_ROUTES.AUTH.ME);

export const logout = () => api.post(API_ROUTES.AUTH.LOGOUT);
export const verifyUserEmail = (token: string) =>
  api.get(API_ROUTES.AUTH.REGISTER, { params: { token } });
