import { useState, useEffect } from 'react'
import { batch } from 'react-redux'
import { GeoJsonLayer } from '@deck.gl/layers'
import { useAppDispatch } from '../../../store/hooks'
import { Feature, FeatureCollection } from '../../../interfaces'
import { fitToBounds } from '../../../store/map-slice'
import { fetchCountryCovid } from '../../../store/covid-slice'
import { setBoard } from '../../../store/board-slice'

const useGeoJsonLayer = (data: FeatureCollection): any => {
    const [layer, setLayer] = useState({})
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
            getLineColor: (d) => [0, 0, 0, 0],
            lineWidthMinPixels: 1,
            onClick: (info: any | { object: Feature }) => {
                batch(() => {
                    dispatch(fetchCountryCovid(info.object.properties.ISO2))
                    dispatch(fitToBounds(info.object.properties.ISO2))
                    dispatch(setBoard('country'))
                })
            }
        })

        setLayer(lr)
    }, [data, dispatch])

    return { layer }
}

export default useGeoJsonLayer
