interface Geometry {
    coordintes?: any
    type?: string
}

interface Features {
    geometry: Geometry
    properties: any
}

export interface FeatureCollection {
    type: 'FeatureCollection'
    features: Features[]
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
