const API_BASE_URL = 'https://frontend-take-home-service.fetch.com'

const request = async <T>(url: string, options: RequestInit = {}): Promise<T | void> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    })

    if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    // Check if the response has content before parsing as JSON
    const contentType = response.headers.get('Content-Type')
    if (contentType && contentType.includes('application/json')) {
        return response.json() as Promise<T>
    }

    return // Return undefined for empty responses (e.g., logout)
}


// Authentication
export const login = (name: string, email: string) =>
    request<void>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ name, email }),
    })

export const logout = () =>
    request<void>('/auth/logout', {
        method: 'POST',
    })

// Dogs API
export const fetchBreeds = () => request<string[]>('/dogs/breeds')