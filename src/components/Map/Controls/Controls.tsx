import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setViewState } from '../../../store/map-slice'
import classes from './Controls.module.scss'

const Controls = () => {
    const { viewState } = useAppSelector((state) => state.map)
    const dispatch = useAppDispatch()

    const zoomInHandler = () => {
        dispatch(setViewState({ zoom: viewState.zoom + 1 }))
    }

    const zoomOutHandler = () => {
        dispatch(setViewState({ zoom: viewState.zoom - 1 }))
    }

    return (
        <div className={classes.Controls}>
            <PlusSquareOutlined
                className={classes.Icon}
                onClick={zoomInHandler}
            />
            <MinusSquareOutlined
                className={classes.Icon}
                onClick={zoomOutHandler}
            />
        </div>
    )
}

export default Controls
