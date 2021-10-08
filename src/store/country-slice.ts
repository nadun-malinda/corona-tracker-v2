import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '.'
import axios from 'axios'
import { fetchCovidCountries } from './covid-slice'
import { Country, Feature } from '../interfaces'

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

interface CountryState {
    countries: Country[]
    country: Country
    loading: boolean
}

const initialState: CountryState = {
    countries: [],
    country: {
        name: '',
        flag: '',
        latest: null,
        cca2: '',
        cca3: '',
        population: 0,
        feature: []
    },
    loading: false
}

const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setCountries(state, action: PayloadAction<Country[]>) {
            state.countries = action.payload
        },
        setCountryFeature(state, action: PayloadAction<Feature>) {
            state.country = { ...state.country, feature: action.payload }
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }
    }
})

// action creators
export const setCountries = (countries: Country[]) => ({
    type: 'country/setCountries',
    payload: countries
})

export const setCountryFeature = (feature: Feature | []) => ({
    type: 'country/setCountryFeature',
    payload: feature
})

export const setLoading = (loading: boolean) => ({
    type: 'country/setLoading',
    payload: loading
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
            dispatch(setLoading(true))
            const countriesResponse = await dispatch(fetchAllCountries())
            const covidResponse = await dispatch(fetchCovidCountries())
            const countryFlags = countriesResponse.data
            const countryCovid = covidResponse.data.data

            const countries = countryCovid
                .map((cc) => {
                    const flag = countryFlags.find((cf) => cf.cca2 === cc.code)
                    return {
                        name: cc.name,
                        cca2: cc.code,
                        latest: cc.latest_data,
                        flag: flag ? flag.flag : ''
                    }
                })
                .filter((c) => c.latest.confirmed > 100000)
                .sort((a, b) => b.latest.confirmed - a.latest.confirmed)

            dispatch(setCountries(countries))
            dispatch(setLoading(false))
        } catch (error) {
            console.log('Error while loading country and covid data: ', error)
            dispatch(setLoading(false))
        }
    }
}

export const countryActions = countrySlice.actions
export default countrySlice
