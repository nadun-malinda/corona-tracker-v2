import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '.'
import axios from 'axios'
import {
    TimelineData,
    Country,
    CovidCountriesResponseData
} from '../interfaces'

interface fetchTimelineResponse {
    data: {
        data: TimelineData[]
    }
}

interface CovidCountryResponse {
    data: {
        data: CovidCountriesResponseData
    }
}

interface CovidCountriesResponse {
    data: {
        data: CovidCountriesResponseData[]
    }
}

interface CovidState {
    country: Country
    loading: boolean
}

const initialState: CovidState = {
    country: {
        name: '',
        flag: '',
        cca2: '',
        cca3: '',
        population: 0,
        latest: null,
        timeline: null
    },
    loading: false
}

const covidSlice = createSlice({
    name: 'covid',
    initialState,
    reducers: {
        setCovidCountry(state, action: PayloadAction<Country>) {
            state.country = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }
    }
})

// action creators
export const setCovidCountry = (covidCountry: Country) => ({
    type: 'covid/setCovidCountry',
    payload: covidCountry
})
export const setLoading = (loading: boolean) => ({
    type: 'covid/setLoading',
    payload: loading
})

// thunks
export const fetchGlobalTimeline = (): AppThunk<
    Promise<fetchTimelineResponse>
> => {
    return async () => {
        return await axios.get(`${process.env.REACT_APP_CORONA_API}/timeline`)
    }
}

export const fetchCovidCountries = (): AppThunk<
    Promise<CovidCountriesResponse>
> => {
    return async (_dispatch, _useSttae) => {
        return await axios.get(`${process.env.REACT_APP_CORONA_API}/countries`)
    }
}

export const fetchCountryCovid = (cca2: string): AppThunk => {
    return async (dispatch, getState) => {
        try {
            dispatch(setLoading(true))

            const response: CovidCountryResponse = await axios.get(
                `${process.env.REACT_APP_CORONA_API}/countries/${cca2}`
            )

            const { name, code, population, latest_data, timeline } =
                response.data.data
            const { countries } = getState().country
            const [country] = countries.filter((c) => c.cca2 === cca2)
            dispatch(
                setCovidCountry({
                    name,
                    cca2: code,
                    population,
                    latest: latest_data,
                    timeline,
                    flag: country.flag
                })
            )

            dispatch(setLoading(false))
        } catch (error) {
            console.log('Error while loading country covid data: ', error)
            dispatch(setLoading(false))
        }
    }
}

export default covidSlice
