import { useState, useEffect } from 'react'
import { GeoJsonLayer } from 'deck.gl'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { Feature, FeatureCollection } from '../../interfaces'
import { fitToBounds } from '../../store/map-slice'
import { setCountryAlpha3Code } from '../../store/country-slice'

const useGeoJsonLayer = (data: FeatureCollection): any => {
    const [layer, setLayer] = useState({})
    const { alpha3Code } = useAppSelector((state) => state.country)
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
                return d.properties.ISO_A3 === alpha3Code
                    ? [245, 198, 0, 255]
                    : [0, 0, 0, 0]
            },
            lineWidthMinPixels: 1,
            onClick: (info: any | { object: Feature }) => {
                console.log('info: ', info)
                dispatch(setCountryAlpha3Code(info.object.properties.ISO_A3))
                dispatch(fitToBounds(info.object.properties.ISO_A3))
            }
        })

        setLayer(lr)
    }, [alpha3Code, data, dispatch])

    return { layer }
}

export default useGeoJsonLayer
