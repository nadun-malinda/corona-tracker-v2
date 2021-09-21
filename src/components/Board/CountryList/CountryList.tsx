import { useState, useEffect } from 'react'
import { Statistic } from 'antd'
import { useAppDispatch } from '../../../store/hooks'
import {
    fetchCountryCovidData,
    fetchCovidCountries
} from '../../../store/board-slice'
import { fetchAllCountries } from '../../../store/country-slice'
import classes from './CountryList.module.scss'
import { fitToBounds } from '../../../store/map-slice'

interface CovidCountryList {
    name: string
    code: string
    latest: any
    flag: string
}

const CountryList = () => {
    const [countryList, setCountryList] = useState<CovidCountryList[]>([])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAllCountries())
            .then((res) => {
                const flags = res.data
                dispatch(fetchCovidCountries())
                    .then((res) => {
                        const data = res.data.data

                        setCountryList(
                            data
                                .map((dt) => {
                                    const _flag = flags.find(
                                        (fl) => fl.alpha2Code === dt.code
                                    )

                                    return {
                                        name: dt.name,
                                        code: dt.code,
                                        latest: dt.latest_data,
                                        flag: _flag ? _flag.flag : ''
                                    }
                                })
                                .sort(
                                    (a, b) =>
                                        b.latest.confirmed - a.latest.confirmed
                                )
                        )
                    })
                    .catch((err) => {
                        console.log('country covid list err: ', err)
                    })
            })
            .catch((err) => {
                console.log('all countries - err: ', err)
            })
    }, [dispatch])

    const onClickHandler = (alpha2Code: string) => {
        dispatch(fetchCountryCovidData(alpha2Code))
        dispatch(fitToBounds(alpha2Code))
    }

    return (
        <ul className={classes.List}>
            {countryList.map((country) => (
                <li
                    key={country.code}
                    className={classes.ListItem}
                    onClick={() => onClickHandler(country.code)}
                >
                    <p className={classes.Name}>
                        <img
                            src={country.flag}
                            alt='country flag'
                            className={classes.Flag}
                        />{' '}
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
