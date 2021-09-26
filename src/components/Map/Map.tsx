import { useState, useCallback, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setViewState } from '../../store/map-slice'
import DeckGL from '@deck.gl/react'
import { FlyToInterpolator, MapView } from '@deck.gl/core'
import { StaticMap } from 'react-map-gl'
import useGeoJsonLayer from './layers/GeoJsonLayerHook'
import { ViewState, FeatureCollection } from '../../interfaces'
import { BOARD_WIDTH } from '../../consts'
// import { json, csv } from 'd3-fetch'
import countriesGeoJson from '../../data/countries-geojson.json'

const boundaryData = countriesGeoJson as FeatureCollection

const Map = () => {
    const [layerData] = useState<FeatureCollection>(boundaryData)
    const { viewState } = useAppSelector((state) => state.map)
    const { layer } = useGeoJsonLayer(layerData)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // csv('../../data/boundary-boxes.csv').then((res) => {
        //     console.log('D3 CSV: ', res)
        // })
        console.log('layerData: ', layerData)
    }, [layerData])

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
        <div>
            <DeckGL
                viewState={{
                    ...viewState,
                    transitionInterpolator: new FlyToInterpolator()
                }}
                views={[
                    new MapView({
                        id: 'map',
                        x: BOARD_WIDTH,
                        width: window.innerWidth - BOARD_WIDTH,
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
                layers={[layer]}
            >
                <StaticMap
                    mapStyle={`mapbox://styles/nadun-malinda/cktn4hraw7jst18wbt6udj2yc`}
                    // mapStyle={'mapbox://styles/mapbox/streets-v11'}
                    mapboxApiAccessToken={
                        process.env.REACT_APP_MAPBOX_API_TOKEN
                    }
                />
            </DeckGL>
        </div>
    )
}

export default Map
