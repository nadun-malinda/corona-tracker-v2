import { useState, useEffect } from 'react'
import { GeoJsonLayer } from 'deck.gl'
import { FeatureCollection } from '../../interfaces'
import dataFile from '../../data/countries.json'
import { convertCountryA3ToA2 } from '../../utils/utils'

const boundaryData = dataFile as FeatureCollection

const useGeoJsonLayer = () => {
    const [layer, setLayer] = useState({})
    const [countryCode, setCountryCode] = useState('LK')

    useEffect(() => {
        const lr = new GeoJsonLayer({
            id: 'countries',
            data: boundaryData,
            stroked: true,
            filled: true,
            pickable: true,
            autoHighlight: true,
            getFillColor: [0, 0, 0, 0],
            getLineColor: [34, 96, 169, 200],
            getLineWidth: 1,
            lineWidthScale: 20,
            lineWidthMinPixels: 2,
            onClick: (info: any) => {
                const cc = convertCountryA3ToA2(info.object.properties.ISO_A3)
                console.log('info: ', info)
                setCountryCode(cc)
            }
        })

        setLayer(lr)
    }, [])

    return { layer, countryCode }
}

export default useGeoJsonLayer
