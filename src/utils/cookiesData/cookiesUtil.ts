// import { cookies } from 'next/headers';
import { getCookie, setCookie } from 'cookies-next';

// TODO: Will be move to ats constants
export enum AuthCookieKey {
  AccessToken = 'atsAccessToken',
  RefreshToken = 'atsRefreshToken',
}

export const getAccessToken = () => {
  let token = getCookie(AuthCookieKey.AccessToken, {});

  if (!token) {
    token = getCookie(AuthCookieKey.AccessToken);
  }
  return token;
};
export const getRefreshToken = () => {
  let refreshToken = getCookie(AuthCookieKey.RefreshToken, {});

  if (!refreshToken) {
    refreshToken = getCookie(AuthCookieKey.RefreshToken);
  }

  return refreshToken;
};

export const setAccessToken = (token: string) => {
  setCookie(AuthCookieKey.AccessToken, token);
};

export const setRefreshToken = (token: string) => {
  setCookie(AuthCookieKey.RefreshToken, token);
};
