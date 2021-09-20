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
    tickFormat: (a: any) => string
}

const AreaSeriesChart = ({ data, tickFormat }: ChartProp) => {
    return (
        <XYPlot height={150} width={350}>
            <VerticalGridLines style={{ strokeOpacity: 0.1 }} />
            <HorizontalGridLines style={{ strokeOpacity: 0.1 }} />
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
                style={{
                    strokeWidth: '2px'
                }}
                opacity={0.4}
                stroke='transparent'
                fill='#862fcf'
                curve={'curveBasis'}
            />
            <XAxis tickFormat={tickFormat} tickLabelAngle={-20} />
            <YAxis
                width={50}
                hideLine
                tickTotal={5}
                style={{ paddingLeft: 100, color: '#bdc1c6' }}
            />
        </XYPlot>
    )
}

export default AreaSeriesChart
