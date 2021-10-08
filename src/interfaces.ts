export type Board = 'world' | 'country'

interface Latest {
    deaths: number
    confirmed: number
    recovered: number
    critical: number
}
export interface Country {
    name: string
    flag?: string
    latest: Latest | null
    cca2: string
    cca3?: string
    population?: number
    timeline?: any
    feature?: Feature | []
}

export interface CovidCountriesResponseData {
    name: string
    code: string
    latest_data: any
    population: number
    timeline: any
}

export interface CountryCodeByAlpha {
    [x: string]: string
}

export interface BoundaryBoxData {
    [x: string]: (string | number[])[]
}

export interface Geometry {
    coordinates?: any
    type?: string
}

export interface Feature {
    type: string
    geometry: Geometry
    properties: {
        NAME?: string
        LAT?: number
        LON?: number
        ISO2?: string
        ISO3?: string
        FIPS?: string
        UN?: number
        AREA?: number
        POP2005?: number
        REGION?: number
        SUBREGION?: number
    }
}

export interface FeatureCollection {
    type: 'FeatureCollection'
    features: Feature[]
}

export type MapStyle =
    | 'streets'
    | 'outdoors'
    | 'light'
    | 'dark'
    | 'satellite'
    | 'satellite-streets'
    | 'navigation-day'
    | 'navigation-night'

export type MapboxStyle =
    | 'streets-v11'
    | 'outdoors-v11'
    | 'light-v10'
    | 'dark-v10'
    | 'satellite-v9'
    | 'satellite-streets-v11'
    | 'navigation-day-v1'
    | 'navigation-night-v1'

export interface ViewState {
    [x: string]: any
    bearing?: number
    height?: number
    latitude?: number
    longitude?: number
    pitch?: number
    width?: number
    zoom?: number
    transitionDuration?: 'auto' | number
    transitionInterpolator?: any
}

export interface TimelineData {
    active: number
    confirmed: number
    date: Date
    deaths: number
    new_confirmed: number
    new_deaths: number
    new_recovered: number
    recovered: number
    updated_at: Date
}

export interface CrosshairValues {
    x: string
    y: number
}
