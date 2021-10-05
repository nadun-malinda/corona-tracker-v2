import { Statistic } from 'antd'
import {
    FrownOutlined,
    ArrowLeftOutlined,
    SmileOutlined,
    MedicineBoxOutlined
} from '@ant-design/icons'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setBoard } from '../../../store/board-slice'
import classes from './CountryBoard.module.scss'

const CountryBoard = () => {
    const { name, population, flag, latest } = useAppSelector(
        (state) => state.covid
    )
    const dispatch = useAppDispatch()

    const backHandler = () => {
        dispatch(setBoard('world'))
    }

    return (
        <div>
            <p className={classes.Back} onClick={backHandler}>
                <ArrowLeftOutlined style={{ marginRight: 8 }} />
                Back
            </p>
            <div className={classes.General}>
                <h3 className={classes.CountryName}>
                    <span className={classes.Flag}>{flag}</span>
                    {name}
                </h3>
                <Statistic title='Population' value={population} />
            </div>

            <ul className={classes.Covid}>
                <li className={classes.ListItem}>
                    <FrownOutlined
                        className={`${classes.Icon} ${classes.Deaths}`}
                    />
                    <Statistic title='Deaths' value={latest?.deaths} />
                </li>
                <li className={classes.ListItem}>
                    <MedicineBoxOutlined
                        className={`${classes.Icon} ${classes.Confirmed}`}
                    />
                    <Statistic title='Confirmed' value={latest?.confirmed} />
                </li>
                <li className={classes.ListItem}>
                    <MedicineBoxOutlined
                        className={`${classes.Icon} ${classes.Critical}`}
                    />
                    <Statistic title='Critical' value={latest?.critical} />
                </li>
                <li className={classes.ListItem}>
                    <SmileOutlined
                        className={`${classes.Icon} ${classes.Recovered}`}
                    />
                    <Statistic title='Recovered' value={latest?.recovered} />
                </li>
            </ul>
        </div>
    )
}

export default CountryBoard
