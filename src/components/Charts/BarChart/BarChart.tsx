import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    HorizontalBarSeries,
    LabelSeries,
    VerticalGridLines
} from 'react-vis'
import 'react-vis/dist/style.css'

const BarChart = ({
    xyPlotData,
    barSeriesData,
    labelSeriesData,
    tickSize,
    tickLabelAngle
}: {
    xyPlotData: any
    barSeriesData: any
    labelSeriesData: any
    tickSize: any
    tickLabelAngle: any
}) => {
    return (
        <div style={{ width: '100%' }}>
            <FlexibleWidthXYPlot
                margin={xyPlotData.margin}
                animation={xyPlotData.animation}
                yType={xyPlotData.yType}
                xType={xyPlotData.xType}
                height={xyPlotData.height}
                color={xyPlotData.color}
            >
                <VerticalGridLines
                    style={{
                        strokeDasharray: '0 4',
                        strokeLinecap: 'round',
                        stroke: '#ccc'
                    }}
                />
                <HorizontalBarSeries
                    animation={barSeriesData.animation}
                    data={barSeriesData.data}
                    barWidth={0.7}
                    style={barSeriesData.style}
                />
                <XAxis
                    hideLine
                    tickSize={tickSize}
                    tickLabelAngle={tickLabelAngle}
                    style={{ fontSize: '10px' }}
                />
                <YAxis
                    hideLine
                    tickSize={tickSize}
                    style={{
                        fontSize: '10px',
                        fill: '#666',
                        textTransform: 'capitalize'
                    }}
                />
                <LabelSeries
                    data={labelSeriesData.data}
                    labelAnchorX={labelSeriesData.labelAnchorX}
                    labelAnchorY={labelSeriesData.labelAnchorY}
                    style={{ transform: 'translate(72px, 2px)' }}
                />
            </FlexibleWidthXYPlot>
        </div>
    )
}

export default BarChart
