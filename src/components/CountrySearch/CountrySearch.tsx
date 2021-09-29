import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { fitToBounds } from '../../store/map-slice'
import { fetchCountryCovid } from '../../store/covid-slice'
import { AutoComplete } from 'antd'
import useDebounce from '../../utils/deBounce'
import classes from './CountrySearch.module.scss'
import {
    fetchCountryByName,
    CountryData as CountryDataInterface
} from '../../store/country-slice'

interface Option {
    value: string
    data: CountryDataInterface
}

const CountrySearch = () => {
    const [text, setText] = useState('')
    const [options, setOptions] = useState<Option[]>([])
    const debounceSearchText = useDebounce(text, 300)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (debounceSearchText === '') {
            setOptions([])
            return
        }

        dispatch(fetchCountryByName(debounceSearchText))
            .then((res) => {
                setOptions(
                    res.data.map((country) => {
                        return {
                            value: country.name.common,
                            data: country
                        }
                    })
                )
            })
            .catch((err) => {
                console.log('Error while searching country: ', err)
            })
    }, [debounceSearchText, dispatch])

    const onSelectHandler = (_: string, option: Option | any) => {
        console.log('on select: ', option)

        const { cca2 } = option.data
        dispatch(fetchCountryCovid(cca2))
        dispatch(fitToBounds(cca2))
    }

    const onSearchHandler = (value: string) => {
        setText(value)
    }

    return (
        <div className={classes.CountrySearch}>
            <AutoComplete
                clearIcon={true}
                className={classes.Search}
                options={options}
                size='large'
                onSelect={onSelectHandler}
                onSearch={onSearchHandler}
                placeholder='Search for country ...'
            />
        </div>
    )
}

export default CountrySearch
