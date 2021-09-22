import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '.'
import axios from 'axios'
import { fetchCovidCountries } from './board-slice'

interface CountryName {
    common: string
    nativeName: any
    official: string
}

export interface CountryData {
    name: CountryName
    cca2: string
    cca3: string
    flag: string
    population: number
}

interface CountrySearchResponse {
    data: CountryData[]
}

interface Country {
    name: string
    flag: string
    code: string
    latest: any
}

interface CountryState {
    countries: Country[]
    country: Country
}

const initialState: CountryState = {
    countries: [],
    country: {
        name: '',
        flag: '',
        code: '',
        latest: null
    }
}

const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setCountries(state, action: PayloadAction<Country[]>) {
            state.countries = action.payload
        }
    }
})

// action creators
export const setCountries = (countries: Country[]) => ({
    type: 'country/setCountries',
    payload: countries
})

export const fetchCountryByName = (
    name: string
): AppThunk<Promise<CountrySearchResponse>> => {
    return async () => {
        return await axios.get(
            `${process.env.REACT_APP_RESTCOUNTRIES_API}/name/${name}`
        )
    }
}

export const fetchAllCountries = (): AppThunk<
    Promise<CountrySearchResponse>
> => {
    return async () => {
        return await axios.get(
            `${process.env.REACT_APP_RESTCOUNTRIES_API}/all?fields=flag,cca2`
        )
    }
}

export const fetchAllCountriesAndCovidData = (): AppThunk => {
    return async (dispatch) => {
        try {
            const countriesResponse = await dispatch(fetchAllCountries())
            const covidResponse = await dispatch(fetchCovidCountries())
            const countryFlags = countriesResponse.data
            const countryCovid = covidResponse.data.data

            const countries = countryCovid
                .map((cc) => {
                    const flag = countryFlags.find((cf) => cf.cca2 === cc.code)
                    return {
                        name: cc.name,
                        code: cc.code,
                        latest: cc.latest_data,
                        flag: flag ? flag.flag : ''
                    }
                })
                .filter((c) => c.latest.confirmed > 100000)
                .sort((a, b) => b.latest.confirmed - a.latest.confirmed)

            dispatch(setCountries(countries))
        } catch (error) {
            console.log('Error while loading country and covid data: ', error)
        }
    }
}

export const countryActions = countrySlice.actions
export default countrySlice
