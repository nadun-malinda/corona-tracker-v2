import CountrySearch from '../CountrySearch/CountrySearch'
import CountryDetails from './CountryDetails/CountryDetails'
import CountryCovid from './CountryCovid/CountryCovid'
import classes from './Board.module.scss'

const Board = () => {
    return (
        <div className={classes.Board}>
            <CountrySearch />
            <CountryDetails />
            <CountryCovid />
        </div>
    )
}

export default Board
