import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setViewState } from '../../store/map-slice'
import { fetchCountryCovidData } from '../../store/board-slice'
import { AutoComplete } from 'antd'
import axios from 'axios'
import { getFitBounds } from '../../utils/utils'
import useDebounce from '../../utils/deBounce'
import classes from './CountrySearch.module.scss'
import { setCountryData } from '../../store/country-slice'

const CountrySearch = () => {
    const [text, setText] = useState('')
    const [options, setOptions] = useState<{ value: string }[]>([])
    const debounceSearchText = useDebounce(text, 300)

    const { viewState } = useAppSelector((state) => state.map)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (debounceSearchText === '') {
            setOptions([])
            return
        }

        axios
            .get(`https://restcountries.eu/rest/v2/name/${debounceSearchText}`)
            .then((res) => {
                console.log('res: ', res)
                setOptions(
                    res.data.map((country: any) => {
                        return {
                            value: country.name,
                            data: country
                        }
                    })
                )
            })
            .catch((err) => {
                console.log('err: ', err)
            })
    }, [debounceSearchText])

    const onSelectHanlder = (value: string, option: any) => {
        console.log('on select: ', option)

        const { flag, population, alpha2Code, alpha3Code } = option.data
        const { longitude, latitude, zoom } = getFitBounds(
            alpha3Code,
            viewState
        )
        dispatch(fetchCountryCovidData(alpha2Code))
        dispatch(setCountryData({ name: value, flag, population }))
        dispatch(setViewState({ latitude, longitude, zoom }))
    }

    const onSearchHandler = (value: string) => {
        setText(value)
    }

    return (
        <div className={classes.CountrySearch}>
            <AutoComplete
                className={classes.Search}
                options={options}
                allowClear={true}
                size='large'
                onSelect={onSelectHanlder}
                onSearch={onSearchHandler}
                placeholder='Search for country ...'
            />
        </div>
    )
}

export default CountrySearch
