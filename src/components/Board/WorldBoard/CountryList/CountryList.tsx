import { useEffect } from 'react'
import { batch } from 'react-redux'
import { Statistic } from 'antd'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { fetchAllCountriesAndCovidData } from '../../../../store/country-slice'
import { fitToBounds } from '../../../../store/map-slice'
import { fetchCountryCovid } from '../../../../store/covid-slice'
import { setBoard } from '../../../../store/board-slice'
import classes from './CountryList.module.scss'
import { Country } from '../../../../interfaces'

const CountryList = () => {
    const { countries } = useAppSelector((state) => state.country)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAllCountriesAndCovidData())
    }, [dispatch])

    const onClickHandler = ({ cca2, flag, latest }: Country) => {
        console.log('latest: ', latest)
        batch(() => {
            dispatch(fetchCountryCovid(cca2))
            dispatch(fitToBounds(cca2))
            dispatch(setBoard('country'))
        })
    }

    return (
        <ul className={classes.List}>
            {countries.map((country) => (
                <li
                    key={country.cca2}
                    className={classes.ListItem}
                    onClick={() => onClickHandler(country)}
                >
                    <p className={classes.Name}>
                        <span className={classes.Flag}>{country.flag}</span>
                        {country.name}
                    </p>
                    <div className={classes.Stats}>
                        <Statistic
                            title='Total cases'
                            value={country.latest?.confirmed}
                        />
                        <Statistic
                            title='Total deaths'
                            value={country.latest?.deaths}
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default CountryList
