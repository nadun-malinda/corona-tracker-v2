import { Statistic } from 'antd'
import {
    FrownOutlined,
    ArrowLeftOutlined,
    SmileOutlined,
    MedicineBoxOutlined
} from '@ant-design/icons'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setBoard } from '../../../store/board-slice'
import GeneralSkeleton from './GeneralSkeleton/GeneralSkeleton'
import CovidListSkeleton from './CovidListSkeleton/CovidListSkeleton'
import classes from './CountryBoard.module.scss'

const CountryBoard = () => {
    const { country, loading } = useAppSelector((state) => state.covid)
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
                {loading ? (
                    <GeneralSkeleton />
                ) : (
                    <>
                        <h3 className={classes.CountryName}>
                            <span className={classes.Flag}>{country.flag}</span>
                            {country.name}
                        </h3>

                        <Statistic
                            title='Population'
                            value={country.population}
                        />
                    </>
                )}
            </div>

            <ul className={classes.Covid}>
                <li className={classes.ListItem}>
                    {loading ? (
                        <CovidListSkeleton />
                    ) : (
                        <>
                            <FrownOutlined
                                className={`${classes.Icon} ${classes.Deaths}`}
                            />
                            <Statistic
                                title='Deaths'
                                value={country.latest?.deaths}
                            />
                        </>
                    )}
                </li>
                <li className={classes.ListItem}>
                    {loading ? (
                        <CovidListSkeleton />
                    ) : (
                        <>
                            <MedicineBoxOutlined
                                className={`${classes.Icon} ${classes.Confirmed}`}
                            />
                            <Statistic
                                title='Confirmed'
                                value={country.latest?.confirmed}
                            />
                        </>
                    )}
                </li>
                <li className={classes.ListItem}>
                    {loading ? (
                        <CovidListSkeleton />
                    ) : (
                        <>
                            <MedicineBoxOutlined
                                className={`${classes.Icon} ${classes.Critical}`}
                            />
                            <Statistic
                                title='Critical'
                                value={country.latest?.critical}
                            />
                        </>
                    )}
                </li>
                <li className={classes.ListItem}>
                    {loading ? (
                        <CovidListSkeleton />
                    ) : (
                        <>
                            <SmileOutlined
                                className={`${classes.Icon} ${classes.Recovered}`}
                            />
                            <Statistic
                                title='Recovered'
                                value={country.latest?.recovered}
                            />
                        </>
                    )}
                </li>
            </ul>
        </div>
    )
}

export default CountryBoard
