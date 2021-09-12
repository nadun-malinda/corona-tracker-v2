import { Row, Col, Statistic } from 'antd'
import { useAppSelector } from '../../../store/hooks'
import StatCard from '../../StatCard/StatCard'
import BarChart from '../../Charts/BarChart/BarChart'
import LineSeriesChart from '../../Charts/LineSeriesChart/LineSeriesChart'
import classes from './CountryCovid.module.scss'

const initialChartData = [
    { y: 'member', x: 0 },
    { y: 'other', x: 0 },
    { y: 'owner', x: 0 },
    { y: 'rental', x: 0 },
    { y: 'total', x: 0 }
]

const CountryCovid = () => {
    const { selectedCountry } = useAppSelector((state) => state.board)

    const getChart = () => {
        return (
            <LineSeriesChart />
            // <BarChart
            //     xyPlotData={{
            //         margin: { left: 70, right: 40, top: 0, bottom: 40 },
            //         animation: true,
            //         yType: 'ordinal',
            //         xType: 'linear',
            //         height: 140
            //     }}
            //     barSeriesData={{
            //         animation: true,
            //         data: initialChartData,
            //         style: {
            //             fill: 'rgb(39, 110, 241)',
            //             stroke: 'rgb(39, 110, 241)',
            //             opacity: '0.85'
            //         }
            //     }}
            //     labelSeriesData={{
            //         data: [
            //             { x: 1, y: 1, label: '', style: {} },
            //             { x: 2, y: 2, label: '', style: {} },
            //             { x: 0, y: 40, label: '', style: {} },
            //             { x: 0, y: 20, label: '', style: {} }
            //         ],
            //         labelAnchorX: 'baseline',
            //         labelAnchorY: 'middle'
            //     }}
            //     tickSize={0}
            //     tickLabelAngle={0}
            // />
        )
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
                <Col span={12}>
                    <Statistic
                        className={classes.MainStat}
                        title='Deaths'
                        value={selectedCountry.today?.deaths}
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
