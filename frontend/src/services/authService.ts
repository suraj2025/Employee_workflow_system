import api from "../api/axios";

import {
  type LoginRequest,
} from "../types/auth";

export const loginUser = async (
  request: LoginRequest
) => {

  const response = await api.post(
    "/auth/login",
    request
  );

  return response.data;
};

export const refreshAccessToken =
  async (
    refreshToken: string
  ) => {

    const response = await api.post(
      "/auth/refresh",
      {
        refreshToken,
      }
    );

    return response.data;
  };