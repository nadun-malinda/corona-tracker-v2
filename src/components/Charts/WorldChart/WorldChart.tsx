import { useState, useEffect, useReducer } from 'react'
import { Select } from 'antd'
import {
    FrownOutlined,
    CalendarOutlined,
    SmileOutlined,
    MedicineBoxOutlined
} from '@ant-design/icons'
import {
    XYPlot,
    XAxis,
    YAxis,
    LineSeries,
    AreaSeries,
    HorizontalGridLines,
    Crosshair
} from 'react-vis'
import * as d3Format from 'd3-format'
import * as d3Array from 'd3-array'
import { useAppDispatch } from '../../../store/hooks'
import { fetchGlobalTimeline } from '../../../store/covid-slice'
import { TimelineData, CrosshairValues } from '../../../interfaces'
import classes from './WorldChart.module.scss'

const { Option } = Select

type TimelineType =
    | 'deaths'
    | 'new_deaths'
    | 'confirmed'
    | 'new_confirmed'
    | 'recovered'
    | 'new_recovered'

interface TimelineCategory {
    key: string
    deaths?: number
    new_deaths?: number
    confirmed?: number
    new_confirmed?: number
    recovered?: number
    new_recovered?: number
}

interface AlteredTimelineData extends TimelineData {
    day: string
    month: string
    year: string
    month_year: string
}

interface ChartData {
    x: string
    y: number | undefined
}

type ACTIONTYPE = { type: TimelineType; payload: TimelineCategory[] }

const defaultTimelineType: TimelineType = 'deaths'
const initialChartData: ChartData[] = [{ x: '', y: 0 }]

const chartDataReducer = (
    state: ChartData[],
    action: ACTIONTYPE
): ChartData[] => {
    switch (action.type) {
        case 'deaths':
        case 'new_deaths':
        case 'confirmed':
        case 'new_confirmed':
        case 'recovered':
        case 'new_recovered':
            return action.payload
                .map((d) => {
                    return {
                        x: d.key,
                        y: d[action.type]
                    }
                })
                .reverse()

        default:
            return state
    }
}

const WorldChart = () => {
    const [isDataReady, setIsDataReady] = useState(false)
    const [crossshairValues, setCrossshairValues] = useState<CrosshairValues[]>(
        []
    )
    const [timeline, setTimeline] = useState<TimelineData[]>([])
    const [alteredTimeline, setAlteredTimeline] = useState<
        AlteredTimelineData[]
    >([])
    const [timelineType, setTimelineType] =
        useState<TimelineType>(defaultTimelineType)
    const [chartData, dispatchChartData] = useReducer(
        chartDataReducer,
        initialChartData
    )
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log('chartData: ', chartData)
    }, [chartData])

    useEffect(() => {
        setIsDataReady(false)
        dispatch(fetchGlobalTimeline())
            .then((res) => {
                setTimeline(res.data.data)
                setIsDataReady(true)
            })
            .catch((err) => {
                console.log('Error loading timeline data: ', err)
                setIsDataReady(true)
            })
    }, [dispatch])

    useEffect(() => {
        setAlteredTimeline(
            timeline.map((d) => {
                const date = new Date(d.date)
                return {
                    ...d,
                    month: date.toLocaleString('en-us', {
                        month: 'short'
                    }),
                    day: date.toLocaleString('en-us', {
                        day: '2-digit'
                    }),
                    year: date.toLocaleString('en-us', {
                        year: '2-digit'
                    }),
                    month_year: date.toLocaleString('en-us', {
                        month: 'short',
                        year: 'numeric'
                    })
                }
            })
        )
    }, [timeline])

    useEffect(() => {
        const grouped = d3Array.group(alteredTimeline, (d) => d.month_year)
        const timelineCategory: TimelineCategory[] = []

        grouped.forEach((val, key) => {
            timelineCategory.push({
                key,
                [timelineType]: d3Array.sum(val, (d) => d[timelineType])
            })
        })
        dispatchChartData({ type: timelineType, payload: timelineCategory })
    }, [alteredTimeline, timelineType])

    const onChangeHandler = (value: TimelineType) => {
        setTimelineType(value)
    }

    const onMouseLeave = () => {
        setCrossshairValues([])
    }

    const onNearestX = (value: any) => {
        setCrossshairValues([value])
    }

    return (
        <div style={{ marginBottom: 20 }}>
            <div style={{ textAlign: 'right', marginBottom: 10 }}>
                <Select
                    onChange={onChangeHandler}
                    defaultValue={defaultTimelineType}
                    style={{ width: 150, textAlign: 'left' }}
                >
                    <Option value='deaths'>Deaths</Option>
                    <Option value='new_deaths'>New deaths</Option>
                    <Option value='confirmed'>Confirmed</Option>
                    <Option value='new_confirmed'>New confirmed</Option>
                    <Option value='recovered'>Recovered</Option>
                    <Option value='new_recovered'>New recovered</Option>
                </Select>
            </div>
            {isDataReady && (
                <XYPlot
                    animation='noWobble'
                    height={220}
                    width={340}
                    xType='ordinal'
                    margin={{
                        left: 43
                    }}
                    onMouseLeave={onMouseLeave}
                >
                    <HorizontalGridLines style={{ strokeOpacity: 0.1 }} />
                    <LineSeries
                        animation='noWobble'
                        // @ts-ignore
                        data={chartData}
                        opacity={1}
                        stroke='#b876ef'
                        strokeStyle='solid'
                        onNearestX={onNearestX}
                        curve={'curveBasis'}
                    />
                    <AreaSeries
                        animation='noWobble'
                        // @ts-ignore
                        data={chartData}
                        style={{
                            strokeWidth: '2px'
                        }}
                        opacity={0.4}
                        stroke='transparent'
                        fill='#862fcf'
                        curve={'curveBasis'}
                    />
                    <Crosshair
                        values={crossshairValues}
                        className={'test-class-name'}
                    >
                        <div className={classes.Crosshair}>
                            <div className={classes.Item}>
                                <CalendarOutlined
                                    className={classes.Calendar}
                                />
                                {crossshairValues[0]?.x}
                            </div>
                            <div className={classes.Item}>
                                {(timelineType === 'confirmed' ||
                                    timelineType === 'new_confirmed') && (
                                    <MedicineBoxOutlined
                                        className={classes.Cases}
                                    />
                                )}
                                {(timelineType === 'deaths' ||
                                    timelineType === 'new_deaths') && (
                                    <FrownOutlined className={classes.Deaths} />
                                )}
                                {(timelineType === 'recovered' ||
                                    timelineType === 'new_recovered') && (
                                    <SmileOutlined
                                        className={classes.Recovered}
                                    />
                                )}

                                {d3Format.formatPrefix(
                                    ',.0',
                                    1
                                )(crossshairValues[0]?.y)}
                            </div>
                        </div>
                    </Crosshair>
                    <XAxis
                        tickSizeInner={0}
                        tickSizeOuter={0}
                        tickFormat={(d) => {
                            const [month] = d.split(' ')
                            if (month === 'Jan' || month === 'Jul') {
                                return d
                            } else {
                                return ''
                            }
                        }}
                    />
                    <YAxis
                        tickSizeInner={0}
                        tickFormat={(d) => {
                            return d3Format.format('~s')(d)
                        }}
                    />
                </XYPlot>
            )}
        </div>
    )
}

export default WorldChart
