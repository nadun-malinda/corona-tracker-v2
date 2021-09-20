import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '.'
import axios from 'axios'

export interface CountryData {
    name: string
    alpha2Code: string
    alpha3Code: string
    flag: string
    population: number
}

interface CountrySearchResponse {
    data: CountryData[]
}

interface CountryState {
    name: string
    flag: string
    population: number
    alpha2Code: string
    alpha3Code: string
    loading?: boolean
}

const initialState: CountryState = {
    name: '',
    flag: '',
    population: 0,
    alpha2Code: '',
    alpha3Code: '',
    loading: true
}

const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setCountryData(state, action: PayloadAction<CountryState>) {
            state.name = action.payload.name
            state.flag = action.payload.flag
            state.population = action.payload.population
        },
        setCountryAlpha2Code(state, action: PayloadAction<string>) {
            state.alpha2Code = action.payload
        },
        setCountryAlpha3Code(state, action: PayloadAction<string>) {
            state.alpha3Code = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }
    }
})

export const setCountryData = (countryData: CountryState) => ({
    type: 'country/setCountryData',
    payload: countryData
})
export const setCountryAlpha2Code = (alpha2Code: string) => ({
    type: 'country/setCountryAlpha2Code',
    payload: alpha2Code
})
export const setCountryAlpha3Code = (alpha3Code: string) => ({
    type: 'country/setCountryAlpha3Code',
    payload: alpha3Code
})
export const setLoading = (loading: boolean) => ({
    type: 'country/setLoading',
    payload: loading
})

export const fetchCountryByName = (
    name: string
): AppThunk<Promise<CountrySearchResponse>> => {
    return async (dispatch, getState) => {
        return await axios.get(`https://restcountries.eu/rest/v2/name/${name}`)
    }
}

export const fetchAllCountries = (): AppThunk<
    Promise<CountrySearchResponse>
> => {
    return async (_dispatch, _getState) => {
        return await axios.get(
            `https://restcountries.eu/rest/v2/all?fields=flag;alpha2Code`
        )
    }
}

export const countryActions = countrySlice.actions
export default countrySlice
