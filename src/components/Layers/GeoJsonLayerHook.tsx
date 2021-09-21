import { useState, useEffect } from 'react'
import { GeoJsonLayer } from 'deck.gl'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { Feature, FeatureCollection } from '../../interfaces'
import { fitToBounds } from '../../store/map-slice'

const useGeoJsonLayer = (data: FeatureCollection): any => {
    const [layer, setLayer] = useState({})
    const { alpha2Code } = useAppSelector((state) => state.country)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const lr = new GeoJsonLayer({
            id: 'countries',
            data: data,
            stroked: true,
            filled: true,
            pickable: true,
            autoHighlight: true,
            highlightColor: [245, 198, 0, 10],
            getFillColor: [0, 0, 0, 0],
            getLineColor: (d: any) => {
                return d.properties.ISO2 === alpha2Code
                    ? [245, 198, 0, 255]
                    : [0, 0, 0, 0]
            },
            lineWidthMinPixels: 1,
            onClick: (info: any | { object: Feature }) => {
                console.log('info: ', info)
                dispatch(fitToBounds(info.object.properties.ISO2))
            }
        })

        setLayer(lr)
    }, [alpha2Code, data, dispatch])

    return { layer }
}

export default useGeoJsonLayer
