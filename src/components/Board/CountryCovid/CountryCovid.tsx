import { Row, Col, Statistic } from 'antd'
import { useAppSelector } from '../../../store/hooks'
import StatCard from '../../StatCard/StatCard'
import BarChart from '../../Charts/BarChart/BarChart'
import LineSeriesChart from '../../Charts/LineSeriesChart/LineSeriesChart'
import AreaSeriesChart from '../../Charts/AreaSeriesChart/AreaSeriesChart'
import classes from './CountryCovid.module.scss'

const CountryCovid = () => {
    const { selectedCountry } = useAppSelector((state) => state.board)

    const getChart = () => {
        const weekTimeline = selectedCountry.timeline?.slice(0, 7)
        const data = weekTimeline?.map((timeline, index) => {
            return {
                x: index,
                y: timeline.new_confirmed,
                x0: timeline.date
            }
        })
        const tickFormat = (d: any) => {
            const arr = selectedCountry.timeline.slice(0, 7).reverse()
            return new Date(arr[d].date).toLocaleDateString('en-US', {
                weekday: 'short'
            })
        }
        return <AreaSeriesChart data={data} tickFormat={tickFormat} />
    }

    const getlastWeekDeathChart = () => {
        const weekTimeline = selectedCountry.timeline?.slice(0, 7)
        const data = weekTimeline?.map((timeline, index) => {
            return {
                x: index,
                y: timeline.new_deaths,
                x0: timeline.date
            }
        })
        const tickFormat = (d: any) => {
            const arr = selectedCountry.timeline.slice(0, 7).reverse()
            return new Date(arr[d].date).toLocaleDateString('en-US', {
                weekday: 'short'
            })
        }
        return <AreaSeriesChart data={data} tickFormat={tickFormat} />
    }

    return (
        <div className={classes.CountryCovid}>
            <h4 className='small-heading'>Covid details</h4>
            <Row>
                <Col span={24}>
                    <Statistic
                        className={classes.MainStat}
                        title='Confirmed'
                        value={selectedCountry.today?.confirmed}
                        suffix={getChart()}
                    />
                </Col>
                <Col span={24}>
                    <Statistic
                        className={classes.MainStat}
                        title='Deaths'
                        value={selectedCountry.today?.deaths}
                        suffix={getlastWeekDeathChart()}
                    />
                </Col>
            </Row>
            <StatCard
                styles={{ borderColor: 'orange' }}
                title='Total'
                confirmed={selectedCountry.latest?.confirmed}
            />
            <StatCard
                styles={{ borderColor: 'red' }}
                title='Deaths'
                confirmed={selectedCountry.latest?.deaths}
            />
            <StatCard
                styles={{ borderColor: 'green' }}
                title='Recovered'
                confirmed={selectedCountry.latest?.recovered}
            />
        </div>
    )
}

export default CountryCovid
