import WorldChart from '../../Charts/WorldChart/WorldChart'
import CountryList from './CountryList/CountryList'
import classes from './WorldBoard.module.scss'

const WorldPanel = () => {
    return (
        <>
            <div className={classes.Chart}>
                <WorldChart />
            </div>
            <div className={classes.List}>
                <CountryList />
            </div>
        </>
    )
}

export default WorldPanel
