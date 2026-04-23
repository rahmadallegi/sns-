const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://sns-backend-production-0668.up.railway.app";

export { API_BASE_URL };

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  if (!response.ok) {
    const errorBody = isJson ? await response.json().catch(() => null) : null;
    const message =
      (errorBody && (errorBody.error || errorBody.message)) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (!isJson) {
    throw new Error("Unexpected response format from server");
  }

  return (await response.json()) as T;
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...init,
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse<T>(response);
}

// Helper to get auth token from localStorage
function getAuthToken(): string | null {
  return localStorage.getItem("adminToken");
}

// Helper to prepare headers with auth token
function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function apiPost<T>(
  path: string,
  body?: Record<string, any>,
  init?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...init,
    method: "POST",
    headers: getAuthHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });

  return handleResponse<T>(response);
}

export async function apiPut<T>(
  path: string,
  body?: Record<string, any>,
  init?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...init,
    method: "PUT",
    headers: getAuthHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });

  return handleResponse<T>(response);
}

export async function apiPatch<T>(
  path: string,
  body?: Record<string, any>,
  init?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...init,
    method: "PATCH",
    headers: getAuthHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });

  return handleResponse<T>(response);
}

export async function apiDelete<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...init,
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse<T>(response);
}
