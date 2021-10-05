import { useAppSelector } from '../../store/hooks'
import WorldBoard from './WorldBoard/WorldBoard'
import CountryBoard from './CountryBoard/CountryBoard'
import classes from './Board.module.scss'

const Board = () => {
    const { board } = useAppSelector((state) => state.board)

    return (
        <div className={classes.Board}>
            <span className={board === 'country' ? classes.Hide : ''}>
                <WorldBoard />
            </span>
            {board === 'country' && <CountryBoard />}
        </div>
    )
}

export default Board
