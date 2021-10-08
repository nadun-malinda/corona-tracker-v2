import { useState, useEffect } from 'react'
import { GeoJsonLayer } from '@deck.gl/layers'
import { Feature } from '../../../interfaces'

const useBorderLayer = (data: Feature | []) => {
    const [borderLayer, setBorderLayer] = useState({})

    useEffect(() => {
        const lr = new GeoJsonLayer({
            id: 'border-layer',
            data,
            stroked: true,
            getFillColor: [0, 0, 0, 0],
            getLineColor: (d) => [245, 198, 0, 200],
            lineWidthMinPixels: 2
        })

        setBorderLayer(lr)
    }, [data])

    return { borderLayer }
}

export default useBorderLayer
