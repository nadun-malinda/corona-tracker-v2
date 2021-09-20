import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setViewState } from '../../store/map-slice'
import { AutoComplete } from 'antd'
import { getFitBounds } from '../../utils/utils'
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

    const { viewState } = useAppSelector((state) => state.map)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (debounceSearchText === '') {
            setOptions([])
            return
        }

        dispatch(fetchCountryByName(debounceSearchText))
            .then((res) => {
                console.log('country search: ', res)
                setOptions(
                    res.data.map((country) => {
                        return {
                            value: country.name,
                            data: country
                        }
                    })
                )
            })
            .catch((err) => {
                console.log('country search err: ', err)
            })
    }, [debounceSearchText, dispatch])

    const onSelectHandler = (value: string, option: Option | any) => {
        console.log('on select: ', option)

        const { alpha3Code } = option.data
        const { longitude, latitude, zoom } = getFitBounds(
            alpha3Code,
            viewState
        )
        dispatch(setViewState({ latitude, longitude, zoom }))
    }

    const onSearchHandler = (value: string) => {
        setText(value)
    }

    return (
        <div className={classes.CountrySearch}>
            <AutoComplete
                className={classes.Search}
                dropdownClassName={classes.Dropdown}
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
