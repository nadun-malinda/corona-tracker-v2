import CountryList from './CountryList/CountryList'
// import LineSeriesChart from '../Charts/LineSeriesChart/LineSeriesChart'
import BarSeriesChart from '../Charts/BarSeriesChart/BarSeriesChart'
import AreaSeriesChart from '../Charts/AreaSeriesChart/AreaSeriesChart'
import classes from './Board.module.scss'

const Board = () => {
    return (
        <div className={classes.Board}>
            <BarSeriesChart />
            {/* <AreaSeriesChart /> */}
            <CountryList />
        </div>
    )
}

export default Board
