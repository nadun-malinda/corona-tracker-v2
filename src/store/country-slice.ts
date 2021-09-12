import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '.'
import axios from 'axios'

interface CountryState {
    name: string
    flag: string
    population: number
    loading?: boolean
}

const initialState: CountryState = {
    name: '',
    flag: '',
    population: 0,
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
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }
    }
})

export const setCountryData = (countryData: CountryState) => ({
    type: 'country/setCountryData',
    payload: countryData
})
export const setLoading = (loading: boolean) => ({
    type: 'country/setLoading',
    payload: loading
})

export const fetchCountryByName = (countryName: string): AppThunk => {
    return async (dispatch, getState) => {
        dispatch(setLoading(true))
        try {
            const response = await axios.get(
                `https://restcountries.eu/rest/v2/name/${countryName}`
            )
            console.log('response: ', response)
            const { name, flag, population } = response.data[0]
            dispatch(
                setCountryData({
                    name,
                    flag,
                    population
                })
            )
            dispatch(setLoading(false))
        } catch (error) {
            console.log('error: ', error)
            dispatch(setLoading(false))
        }
    }
}

export const countryActions = countrySlice.actions
export default countrySlice
