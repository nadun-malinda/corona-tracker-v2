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

const data = [
    { x: 0, y: 4 },
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 4 },
    { x: 4, y: 2 },
    { x: 5, y: 5 },
    { x: 6, y: 3 }
]

const LineSeriesChart = () => {
    return (
        <XYPlot height={300} width={250}>
            <GradientDefs>
                <linearGradient id='CoolGradient' x1='0' x2='0' y1='0' y2='1'>
                    <stop offset='0%' stopColor='red' stopOpacity={0.4} />
                    <stop offset='100%' stopColor='blue' stopOpacity={0.3} />
                </linearGradient>
            </GradientDefs>
            {/* <VerticalBarSeries barWidth={1} data={data} /> */}
            <AreaSeries
                data={data}
                style={{
                    strokeWidth: '2px'
                }}
                // stroke='#ba4fb9'
                color={'url(#CoolGradient)'}
                curve={'curveBasis'}
            />
            <Borders
                style={{
                    bottom: { fill: '#fff' },
                    left: { fill: 'url(#CoolGradient)', opacity: 0.1 },
                    right: { fill: '#fff' },
                    top: { fill: '#fff' }
                }}
            />
            <XAxis title='X' tickTotal={7} />
            <YAxis title='Y' />
        </XYPlot>
    )
}

export default LineSeriesChart
