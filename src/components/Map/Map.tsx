import { useState, useCallback, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setViewState } from '../../store/map-slice'
import DeckGL from '@deck.gl/react'
import { FlyToInterpolator, MapView } from '@deck.gl/core'
import { StaticMap } from 'react-map-gl'
import useCountryLayer from './layers/CountryLayerHook'
import useBorderLayer from './layers/BorderLayerHook'
import { ViewState, FeatureCollection, Feature } from '../../interfaces'
import { BOARD_WIDTH } from '../../consts'
// import { json, csv } from 'd3-fetch'
import countriesGeoJson from '../../data/countries-geojson.json'
import classes from './Map.module.scss'

const boundaryData = countriesGeoJson as FeatureCollection
const initialBorderFetaure: Feature = {
    type: 'Feature',
    properties: {},
    geometry: {}
}

const Map = () => {
    const [layerData] = useState<FeatureCollection>(boundaryData)
    const [borderLayerData, setBorderLayerData] = useState<Feature | []>(
        initialBorderFetaure
    )
    const { viewState, mapWidth } = useAppSelector((state) => state.map)
    const { country } = useAppSelector((state) => state.country)
    const { open } = useAppSelector((state) => state.board)
    const { countryLayer } = useCountryLayer(layerData)
    const { borderLayer } = useBorderLayer(borderLayerData)
    const dispatch = useAppDispatch()

    useEffect(() => {
        country.feature && setBorderLayerData(country.feature)
    }, [country])

    const onViewStateChangeHandler = useCallback(
        ({ viewState }: { viewState: ViewState }) => {
            const { bearing, width, height, latitude, longitude, pitch, zoom } =
                viewState
            dispatch(
                setViewState({
                    bearing,
                    width,
                    height,
                    latitude,
                    longitude,
                    pitch,
                    zoom
                })
            )
        },
        [dispatch]
    )

    return (
        <div className={classes.Map}>
            <DeckGL
                viewState={{
                    ...viewState,
                    transitionInterpolator: new FlyToInterpolator()
                }}
                views={[
                    new MapView({
                        id: 'map',
                        x: open ? BOARD_WIDTH : 0,
                        width: mapWidth,
                        controller: true
                    })
                ]}
                onViewStateChange={onViewStateChangeHandler}
                controller={true}
                getCursor={(interactiveState: any) => {
                    if (interactiveState.isHovering) {
                        return 'pointer'
                    }
                    if (interactiveState.isDragging) {
                        return 'grabbing'
                    } else {
                        return 'grab'
                    }
                }}
                layers={[countryLayer, borderLayer]}
            >
                <StaticMap
                    mapStyle={`mapbox://styles/nadun-malinda/cktn4hraw7jst18wbt6udj2yc`}
                    mapboxApiAccessToken={
                        process.env.REACT_APP_MAPBOX_API_TOKEN
                    }
                />
            </DeckGL>
        </div>
    )
}

export default Map
