import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '.'
import axios from 'axios'

interface Coordinates {
    latitude: number
    longitude: number
}

interface SelectedCountry {
    name?: string | null
    population?: number
    coordinates?: Coordinates
    today?: {
        deaths: number
        confirmed: number
    }
    flag?: string
    latest: {
        confirmed: number
        critical: number
        deaths: number
        recovered: number
    }
}

interface BoardState {
    selectedCountry: SelectedCountry
    loading: boolean
}

const initialState: BoardState = {
    selectedCountry: {
        name: null,
        population: 0,
        coordinates: { latitude: 0, longitude: 0 },
        today: {
            deaths: 0,
            confirmed: 0
        },
        flag: '',
        latest: {
            confirmed: 0,
            critical: 0,
            deaths: 0,
            recovered: 0
        }
    },
    loading: false
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setSelectedCountry(state, action: PayloadAction<SelectedCountry>) {
            state.selectedCountry = {
                ...state.selectedCountry,
                ...action.payload
            }
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }
    }
})

export const setSelectedCountry = (selectedCountry: SelectedCountry) => ({
    type: 'board/setSelectedCountry',
    payload: selectedCountry
})
export const setLoading = (loading: boolean) => ({
    type: 'country/setLoading',
    payload: loading
})

export const fetchCountryCovidData = (countryCode: string): AppThunk => {
    return async (dispatch, getState) => {
        dispatch(setLoading(true))
        try {
            const response = await axios.get(
                `https://corona-api.com/countries/${countryCode}`
            )
            console.log('covid response; ', response)
            const { name, population, coordinates, today, latest_data } =
                response.data.data
            dispatch(
                setSelectedCountry({
                    name,
                    population,
                    coordinates: {
                        longitude: coordinates.longitude,
                        latitude: coordinates.latitude
                    },
                    today: {
                        deaths: today.deaths,
                        confirmed: today.confirmed
                    },
                    latest: {
                        confirmed: latest_data.confirmed,
                        critical: latest_data.critical,
                        deaths: latest_data.deaths,
                        recovered: latest_data.recovered
                    }
                })
            )
            dispatch(setLoading(false))
        } catch (error) {
            console.log('error: ', error)
            dispatch(setLoading(false))
        }
    }
}

export const boardActions = boardSlice.actions
export default boardSlice
