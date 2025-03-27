import { Any, Obj } from 'constants/types';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from 'utils/cookiesData/cookiesUtil';
import { env } from 'constants/env';

type Body = Record<string, Any>;

type FetchOptions = {
  query?: Obj;
};

const generateQueryString = (query: Obj | undefined) => {
  if (!query || Object.keys(query).length === 0) return '';

  const queryParams: string[] = [];

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) queryParams.push(`${key}=${value}`);
  }

  return '?' + queryParams.join('&');
};

const onFulfilled = async (res: Response, method?: string, body?: Body) => {
  if (res.status == 401) {
    const { url, headers } = res;
    const refreshToken = getRefreshToken();

    const responseRefresh = await fetch(`${env.TICKET_SERVER_URL}/admin/auth/refresh`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await responseRefresh.json();

    setAccessToken(data?.accessToken);
    setRefreshToken(data?.refreshToken);

    // action again
    const result = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...headers,
        Authorization: `Bearer ${data?.accessToken}`,
      },
    });

    const reNewData = await result.json();

    return reNewData;

    // throw new Error('res');
  }

  return res.json();
};

type CreateFetchApiParams = {
  baseUrl: string;
  isClientRequest?: boolean;
};

export default ({ baseUrl }: CreateFetchApiParams) => {
  const accessToken = getAccessToken();

  const requestInit: Omit<RequestInit, 'method' | 'body'> = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-cache',
  };

  return {
    get: <RS = Any>(url: string, options?: FetchOptions): Promise<RS> => {
      const finalUrl = `${baseUrl}${url}${generateQueryString(options?.query)}`;
      console.info(`GET ${finalUrl}`);

      return fetch(finalUrl, requestInit).then(res => onFulfilled(res, 'GET'));
    },

    post: <RS = Any>(url: string, body: Body): Promise<RS> =>
      fetch(`${baseUrl}${url}`, { method: 'POST', body: JSON.stringify(body), ...requestInit }).then(res =>
        onFulfilled(res, 'POST', body)
      ),

    put: <RS = Any>(url: string, body: Body): Promise<RS> =>
      fetch(`${baseUrl}${url}`, { method: 'PUT', body: JSON.stringify(body), ...requestInit }).then(res =>
        onFulfilled(res, 'PUT', body)
      ),

    patch: <RS = Any>(url: string, body: Body): Promise<RS> =>
      fetch(`${baseUrl}${url}`, { method: 'PATCH', body: JSON.stringify(body), ...requestInit }).then(res =>
        onFulfilled(res, 'PATCH', body)
      ),

    delete: <RS = Any>(url: string, body?: Body): Promise<RS> =>
      fetch(`${baseUrl}${url}`, {
        method: 'DELETE',
        body: body ? JSON.stringify(body) : undefined,
        ...requestInit,
      }).then(res => onFulfilled(res, 'DELETE')),

    postMultipart: <RS = Any>(url: string, body: Body): Promise<RS> => {
      const formData = new FormData();
      Object.entries(body).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      return fetch(`${baseUrl}${url}`, {
        method: 'POST',
        body: formData,
      }).then(res => onFulfilled(res, 'POST', body));
    },

    upload: <RS = Any>(url: string, body: FormData): Promise<RS> =>
      fetch(`${baseUrl}${url}`, {
        method: 'POST',
        body,
      }).then(res => onFulfilled(res, 'POST', body)),
  };
};
