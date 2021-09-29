import WorldPanel from './WorldBoard/WorldBoard'
import classes from './Board.module.scss'

const Board = () => {
    return (
        <div className={classes.Board}>
            <WorldPanel />
        </div>
    )
}

export default Board
