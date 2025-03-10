import { Dog, DogSearchResponse, SearchDogsParams } from "@/types"

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

export const searchDogs = async (searchParams: SearchDogsParams) => {
    const params = new URLSearchParams()
    searchParams.breeds.forEach(breed => params.append('breeds', breed))
    searchParams.zipCodes.forEach(zipCode => params.append('zipCodes', zipCode))
    if (searchParams.ageMin) params.append('ageMin', searchParams.ageMin.toString())
    if (searchParams.ageMax) params.append('ageMax', searchParams.ageMax.toString())
    params.append('sort', `${searchParams.sortBy||'breed'}:${searchParams.sortDir||'asc'}`)
    params.append('size', '18')

    return requestWithDefault<DogSearchResponse>(`/dogs/search?${params.toString()}`, {
        total: 0,
        resultIds: [],
    })
}

export const searchDogsFromUrl = (url: string) => requestWithDefault<DogSearchResponse>(url, {
    total: 0,
    resultIds: []
}) 

export const fetchDogs = async (dogIds: string[]) => 
    requestWithDefault<Dog[]>('/dogs', [], {
        method: 'POST',
        body: JSON.stringify(dogIds),
    })

export const match = async (dogIds: string[]) => 
    requestWithDefault<{ match: string } | null>('/dogs/match', null, {
        method: 'POST',
        body: JSON.stringify(dogIds)
    })