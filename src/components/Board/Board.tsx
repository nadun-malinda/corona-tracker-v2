import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import WorldBoard from './WorldBoard/WorldBoard'
import CountryBoard from './CountryBoard/CountryBoard'
import classes from './Board.module.scss'
import { toggleBoard } from '../../store/board-slice'

const Board = () => {
    const { board, open } = useAppSelector((state) => state.board)
    const dispatch = useAppDispatch()

    const onToggle = () => {
        dispatch(toggleBoard(!open))
    }

    return (
        <div
            className={`${classes.Board} ${
                open ? classes.SlideRight : classes.SlideLeft
            }`}
        >
            <div className={classes.Toggler} onClick={onToggle}>
                <div className={classes.IconWrap}>
                    {open && <LeftOutlined className={classes.Icon} />}
                    {!open && <RightOutlined className={classes.Icon} />}
                </div>
            </div>
            <span className={board === 'country' ? classes.Hide : ''}>
                <WorldBoard />
            </span>
            {board === 'country' && <CountryBoard />}
        </div>
    )
}

export default Board
