import { useState, useEffect } from 'react'
import {
    XYPlot,
    XAxis,
    YAxis,
    LineSeries,
    AreaSeries,
    VerticalBarSeries,
    GradientDefs,
    VerticalGridLines,
    HorizontalGridLines,
    Borders
} from 'react-vis'
import { useAppSelector } from '../../../store/hooks'

const LineSeriesChart = () => {
    const [chartData, setChartData] = useState<any>([])
    const { selectedCountry } = useAppSelector((state) => state.board)

    useEffect(() => {
        const weekTimeline = selectedCountry.timeline?.slice(0, 7)
        console.log('week: ', weekTimeline)
        setChartData(
            weekTimeline?.map((timeline, index) => {
                return {
                    x: index,
                    y: timeline.new_deaths,
                    x0: timeline.date
                }
            })
        )
    }, [selectedCountry.timeline])

    return (
        <XYPlot height={150} width={280}>
            <GradientDefs>
                <linearGradient id='CoolGradient' x1='0' x2='0' y1='0' y2='1'>
                    <stop offset='0%' stopColor='red' stopOpacity={0.4} />
                    <stop offset='100%' stopColor='blue' stopOpacity={0.3} />
                </linearGradient>
            </GradientDefs>
            <VerticalGridLines />
            <HorizontalGridLines />
            {/* <VerticalBarSeries barWidth={1} data={data} /> */}
            <LineSeries
                data={chartData}
                opacity={1}
                stroke='#12939a'
                strokeStyle='solid'
                curve={'curveBasis'}
            />
            <AreaSeries
                data={chartData}
                style={{
                    strokeWidth: '2px'
                }}
                // stroke='#ba4fb9'
                // color={'url(#CoolGradient)'}
                opacity={0.25}
                stroke='transparent'
                curve={'curveBasis'}
            />
            {/* <Borders
                style={{
                    bottom: { fill: '#fff' },
                    left: { fill: 'url(#CoolGradient)', opacity: 0.1 },
                    right: { fill: '#fff' },
                    top: { fill: '#fff' }
                }}
            /> */}
            <XAxis
                tickFormat={(d) => {
                    const arr = selectedCountry.timeline.slice(0, 7).reverse()
                    return new Date(arr[d].date).toLocaleDateString('en-US', {
                        weekday: 'short'
                    })
                }}
                tickLabelAngle={-20}
            />
            <YAxis />
        </XYPlot>
    )
}

export default LineSeriesChart
