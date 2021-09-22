import { useEffect } from 'react'
import { Statistic } from 'antd'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { fetchCountryCovidData } from '../../../store/board-slice'
import { fetchAllCountriesAndCovidData } from '../../../store/country-slice'
import classes from './CountryList.module.scss'
import { fitToBounds } from '../../../store/map-slice'

const CountryList = () => {
    const { countries } = useAppSelector((state) => state.country)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAllCountriesAndCovidData())
    }, [dispatch])

    const onClickHandler = (code: string) => {
        dispatch(fetchCountryCovidData(code))
        dispatch(fitToBounds(code))
    }

    return (
        <ul className={classes.List}>
            {countries.map((country) => (
                <li
                    key={country.code}
                    className={classes.ListItem}
                    onClick={() => onClickHandler(country.code)}
                >
                    <p className={classes.Name}>
                        <span className={classes.Flag}>{country.flag}</span>
                        {country.name}
                    </p>
                    <div className={classes.Stats}>
                        <Statistic
                            title='Total cases'
                            value={country.latest.confirmed}
                        />
                        <Statistic
                            title='Total deaths'
                            value={country.latest.deaths}
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default CountryList
