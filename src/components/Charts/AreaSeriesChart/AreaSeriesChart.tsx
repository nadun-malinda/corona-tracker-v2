import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { fetchGlobalTimeline } from '../../../store/covid-slice'
import {
    XYPlot,
    XAxis,
    YAxis,
    LineSeries,
    AreaSeries,
    VerticalGridLines,
    HorizontalGridLines
} from 'react-vis'

interface ChartProp {
    data: {
        x: number
        y: number
    }[]
    tickFormat?: (a: any) => string
}

const AreaSeriesChart = () => {
    const [data, setData] = useState<any>([])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchGlobalTimeline())
            .then((res) => {
                setData(
                    res.data.data
                        .map((timeline) => {
                            const d = new Date(timeline.date)
                            return {
                                x: d.toLocaleString('en-us', {
                                    day: '2-digit'
                                }),
                                y: timeline.confirmed
                                // x0: timeline.date
                            }
                        })
                        .reverse()
                )
            })
            .catch((err) => console.log('err: ', err))
    }, [dispatch])

    return (
        <XYPlot
            height={180}
            width={340}
            xType='ordinal'
            margin={{
                left: 55
            }}
        >
            {/* <VerticalGridLines style={{ strokeOpacity: 0.1 }} />
            <HorizontalGridLines style={{ strokeOpacity: 0.1 }} /> */}
            <LineSeries
                animation='noWobble'
                data={data}
                opacity={1}
                stroke='#b876ef'
                strokeStyle='solid'
                curve={'curveBasis'}
            />
            <AreaSeries
                animation='noWobble'
                data={data}
                // style={{
                //     strokeWidth: '2px'
                // }}
                opacity={0.4}
                stroke='transparent'
                fill='#862fcf'
                curve={'curveBasis'}
            />
            <XAxis tickLabelAngle={-20} />
            <YAxis />
        </XYPlot>
    )
}

export default AreaSeriesChart
