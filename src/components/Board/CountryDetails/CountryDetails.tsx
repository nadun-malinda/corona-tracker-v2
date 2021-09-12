import { useAppSelector } from '../../../store/hooks'
import { Statistic, Skeleton } from 'antd'
import classes from './CountryDetails.module.scss'

const CountryDetails = () => {
    const { name, flag, population, loading } = useAppSelector(
        (state) => state.country
    )

    return (
        <div className={classes.CountryDertails}>
            {!loading && (
                <>
                    <div className={classes.FlagWrap}>
                        <img
                            src={flag}
                            alt='Cover flag'
                            className={classes.Flag}
                        />
                    </div>
                    <div className={classes.List}>
                        <h2>{name}</h2>
                        <Statistic title='Population' value={population} />
                    </div>
                </>
            )}
            <Skeleton className={classes.Skeleton} loading={loading} active />
        </div>
    )
}

export default CountryDetails
