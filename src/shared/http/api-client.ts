export interface ApiError {
  statusCode: number
  error: string
  message: string
  path: string
  timestamp: string
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly errorCode: string,
    public readonly path: string,
    public readonly timestamp: string,
  ) {
    super(message)
    this.name = 'ApiClientError'
  }
}

interface ApiClientConfig {
  getToken: () => string | null
  onUnauthorized: () => void
}

let config: ApiClientConfig | null = null

export function configureApiClient(clientConfig: ApiClientConfig): void {
  config = clientConfig
}

function getAuthHeader(): HeadersInit {
  if (!config) return {}
  const token = config.getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T
  }

  const data = (await response.json()) as unknown

  if (!response.ok) {
    const error = data as ApiError
    const path = error.path || response.url

    if (response.status === 401 && config && !path.includes('/auth/login')) {
      config.onUnauthorized()
    }

    throw new ApiClientError(
      error.message || 'Algo salió mal.',
      error.statusCode || response.status,
      error.error || 'UNKNOWN_ERROR',
      path,
      error.timestamp || new Date().toISOString(),
    )
  }

  return data as T
}

export async function get<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  })

  return handleResponse<T>(response)
}

export async function post<T>(url: string, body?: unknown): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  return handleResponse<T>(response)
}

export function buildUrl(path: string): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined
  if (!baseUrl) {
    throw new Error('VITE_API_BASE_URL is not defined.')
  }
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}
