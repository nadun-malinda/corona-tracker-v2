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
