import { Dog, DogSearchResponse, SortParams } from "@/types"

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

const requestWithDefault = async <T>(url: string, defaultValue: T, options: RequestInit = {}): Promise<T> => {
    const response = await request<T>(url, options)
    return response ?? defaultValue
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
export const fetchBreeds = () => requestWithDefault<string[]>('/dogs/breeds', [])

export const searchDogs = async (breeds: string[], zipCodes: string[], ageMin: number | undefined, ageMax: number | undefined, sortBy: SortParams['by'] = undefined, sortDir: SortParams['dir'] = 'asc') => {
    const params = new URLSearchParams()
    breeds.forEach(breed => params.append('breeds', breed))
    zipCodes.forEach(zipCode => params.append('zipCodes', zipCode))
    if (ageMin) params.append('ageMin', ageMin.toString())
    if (ageMax) params.append('ageMax', ageMax.toString())
    if (sortBy || sortDir) params.append('sort', `${sortBy||'breed'}:${sortDir}`)

    console.log('Search params:', params.toString())
    return requestWithDefault<DogSearchResponse>(`/dogs/search?${params.toString()}`, {
        total: 0,
        next: '',
        resultIds: [],
    })
}

export const fetchDogs = async (dogIds: string[]) => 
    requestWithDefault<Dog[]>('/dogs', [], {
        method: 'POST',
        body: JSON.stringify(dogIds),
    })