import { WebMercatorViewport } from '@deck.gl/core'
import {
    ViewState,
    BoundaryBoxData,
    FeatureCollection,
    Feature
} from '../interfaces'
import bbDataFile from '../data/boundary-boxes.json'
import countryGeoJsonFile from '../data/countries-geojson.json'

const boundaryBoxData = bbDataFile as BoundaryBoxData
const boundaryGeoJsonData = countryGeoJsonFile as FeatureCollection

export const getFeatureByAplha2 = (
    alpha2Code: string | number
): Feature | [] => {
    const feature = boundaryGeoJsonData.features.find(
        (fe) => fe.properties.ISO2 === alpha2Code
    )

    return feature ? feature : []
}

export const getBoundsByAlpha2 = (alpha2Code: string | number) => {
    const bb = boundaryBoxData[alpha2Code]?.[1]
        ? boundaryBoxData[alpha2Code][1]
        : [null, [null, null, null, null]]
    return [
        [bb[0], bb[1]],
        [bb[2], bb[3]]
    ]
}

export const getFitBounds = (alpha2Code: string, viewState: ViewState) => {
    const bounds = getBoundsByAlpha2(alpha2Code)
    if (bounds[0][0] === null) return false
    console.log('bounds: ', bounds)
    const vp = new WebMercatorViewport({ ...viewState }) as unknown as ViewState
    const { width, height, longitude, latitude, zoom } = vp.fitBounds(bounds, {
        padding: 60
    })

    return { width, height, longitude, latitude, zoom }
}
