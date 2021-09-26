import { useState, useEffect } from 'react'
import { Select } from 'antd'
import { XYPlot, XAxis, YAxis, VerticalBarSeries } from 'react-vis'
import * as d3 from 'd3-format'
import { useAppDispatch } from '../../../store/hooks'
import { fetchGlobalTimeline } from '../../../store/covid-slice'
import { TimelineData } from '../../../interfaces'

const { Option } = Select

type TimelineType = 'deaths' | 'new_deaths' | 'confirmed' | 'new_confirmed'

const defaultTimelineType: TimelineType = 'deaths'

const BarSeriesChart = () => {
    const [data, setData] = useState<any>([])
    const [timeline, setTimeline] = useState<TimelineData[]>([])
    const [timelineType, setTimelineType] =
        useState<TimelineType>(defaultTimelineType)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchGlobalTimeline())
            .then((res) => {
                setTimeline(res.data.data)
            })
            .catch((err) => console.log('err: ', err))
    }, [dispatch])

    useEffect(() => {
        setData(
            timeline
                .map((timeline) => {
                    const d = new Date(timeline.date)
                    return {
                        x: d.toLocaleString('en-us', {
                            month: 'short',
                            year: '2-digit'
                        }),
                        y: timeline[timelineType]
                    }
                })
                .reverse()
        )
    }, [timeline, timelineType])

    const onChangeHandler = (value: TimelineType) => {
        setTimelineType(value)
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
                </Select>
            </div>
            <XYPlot
                animation='noWobble'
                height={220}
                width={340}
                xType='ordinal'
                margin={{
                    left: 43
                }}
            >
                <VerticalBarSeries
                    // color='#f5c600'
                    animation='noWobble'
                    barWidth={0.8}
                    data={data}
                />
                <XAxis
                    tickSizeInner={0}
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
                        return d3.format('~s')(d)
                    }}
                />
            </XYPlot>
        </div>
    )
}

export default BarSeriesChart
