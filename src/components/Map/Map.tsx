import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setViewState } from '../../store/map-slice'
import { fetchCountryCovidData } from '../../store/board-slice'
import DeckGL from '@deck.gl/react'
import { FlyToInterpolator, MapView } from '@deck.gl/core'
import { StaticMap } from 'react-map-gl'
import { getFitBounds } from '../../utils/utils'
import useGeoJsonLayer from '../Layers/GeoJsonLayerHook'
import { ViewState } from '../../interfaces'
import { fetchCountryByName } from '../../store/country-slice'

const Map = () => {
    const { mapStyle, viewState } = useAppSelector((state) => state.map)
    const { layer, countryCode } = useGeoJsonLayer()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const { width, height, longitude, latitude, zoom } = getFitBounds(
            'LKA',
            {
                bearing: 0,
                latitude: 7.100892668623654,
                longitude: 80.15625000000001,
                pitch: 0,
                zoom: 4,
                width: window.innerWidth,
                height: window.innerHeight
            }
        )
        dispatch(setViewState({ width, height, latitude, longitude, zoom }))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchCountryCovidData(countryCode))
        dispatch(fetchCountryByName('Sri Lanka'))
    }, [countryCode, dispatch])

    const onViewStateChangeHandler = ({
        viewState
    }: {
        viewState: ViewState
    }) => {
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
    }

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
                        x: 340,
                        width: window.innerWidth - 340,
                        controller: true
                    })
                ]}
                onViewStateChange={onViewStateChangeHandler}
                controller={true}
                // @ts-ignore
                layers={[layer]}
            >
                <StaticMap
                    mapStyle={`mapbox://styles/mapbox/${mapStyle}`}
                    mapboxApiAccessToken={
                        process.env.REACT_APP_MAPBOX_API_TOKEN
                    }
                />
            </DeckGL>
        </div>
    )
}

export default Map
