import { Select } from 'antd'
import { MapboxStyle } from '../../interfaces'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setMapStyle } from '../../store/map-slice'
import classes from './Controls.module.scss'

const { Option } = Select

const Controls = () => {
    const { mapStyle } = useAppSelector((state) => state.map)
    const dispatch = useAppDispatch()

    const onSelectMapStyleHandler = (value: MapboxStyle) => {
        dispatch(setMapStyle(value))
    }

    return (
        <div className={classes.Controls}>
            <Select
                defaultValue={mapStyle}
                style={{ width: 150 }}
                onChange={onSelectMapStyleHandler}
            >
                <Option value='streets-v11'>Streets</Option>
                <Option value='outdoors-v11'>Outdoors</Option>
                <Option value='light-v10'>Light</Option>
                <Option value='dark-v10'>Dark</Option>
                <Option value='satellite-v9'>Satellite</Option>
                <Option value='satellite-streets-v11'>Satellite-Streets</Option>
                <Option value='navigation-day-v1'>Navigation-Day</Option>
                <Option value='navigation-night-v1'>Navigation-Night</Option>
            </Select>
        </div>
    )
}

export default Controls
