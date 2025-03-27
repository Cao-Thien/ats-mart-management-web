'use server';
// MODELS

// UTILS
import createFetchApi from './utils/createFetchApi';

// CONSTANTS
import { AppResponse } from 'constants/ats/response';
import { env } from 'constants/env';
import { cookies } from 'next/headers';
import { AuthCookieKey } from 'utils/cookiesData/cookiesUtil';

const authApi = createFetchApi({
  baseUrl: `${env.TICKET_SERVER_URL}/admin/auth`,
});

export const login = async (payload: { username: string; password: string }) => {
  const { data } = await authApi.post<AppResponse>('/login', payload);

  if (data) {
    cookies().set(AuthCookieKey.AccessToken, data.accessToken, {
      maxAge: 60 * 60 * 24 * 1, // One day
    });

    cookies().set(AuthCookieKey.RefreshToken, data.refreshToken, {
      maxAge: 60 * 60 * 24 * 1, // One day
    });
  }

  return data;
};

export const logout = async () => {
  cookies().delete(AuthCookieKey.AccessToken);
  cookies().delete(AuthCookieKey.RefreshToken);
};
