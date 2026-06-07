export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  return baseUrl;
};

const normalizeResponse = (payload: unknown) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const data = payload as Record<string, unknown>;

    if (Array.isArray(data.results)) {
      return data.results;
    }

    if (Array.isArray(data.data)) {
      return data.data;
    }

    const arrayKey = Object.keys(data).find((key) => Array.isArray(data[key]));
    if (arrayKey) {
      return data[arrayKey] as unknown[];
    }
  }

  return [];
};

export async function fetchApi(endpoint: string) {
  const response = await fetch(`${getApiBaseUrl()}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  return normalizeResponse(payload);
}
