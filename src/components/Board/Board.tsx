import CountryList from './CountryList/CountryList'
import classes from './Board.module.scss'

const Board = () => {
    return (
        <div className={classes.Board}>
            <CountryList />
        </div>
    )
}

export default Board
