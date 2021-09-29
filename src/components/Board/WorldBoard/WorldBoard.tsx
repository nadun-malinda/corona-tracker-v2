import WorldChart from '../../Charts/WorldChart/WorldChart'
import CountryList from './CountryList/CountryList'
import classes from './WorldBoard.module.scss'

const WorldPanel = () => {
    return (
        <>
            <WorldChart />
            <div className={classes.List}>
                <CountryList />
            </div>
        </>
    )
}

export default WorldPanel
