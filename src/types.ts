export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

export interface SortParams {
    by: 'breed' | 'age' | 'name' | undefined
    dir: 'asc' | 'desc'
}

export interface SearchDogsParams {
    breeds: string[]
    zipCodes: string[]
    ageMin?: number
    ageMax?: number
    sortBy?: SortParams['by']
    sortDir?: SortParams['dir']
    from?: number
}

export interface DogSearchResponse {
    total: number
    next?: string
    prev?: string
    resultIds: string[]
}

export interface Location {
    zip_code: string
    latitude: number
    longitude: number
    city: string
    state: string
    county: string
}

export interface Coordinates {
    lat: number;
    lon: number;
}