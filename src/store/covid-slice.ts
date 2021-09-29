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

const initialState: Country = {
    name: '',
    flag: '',
    cca2: '',
    cca3: '',
    population: 0,
    latest: null,
    timeline: null
}

const covidSlice = createSlice({
    name: 'covid',
    initialState,
    reducers: {
        setCovidCountry(state, action: PayloadAction<Country>) {
            state.name = action.payload.name
            state.cca2 = action.payload.cca2
            state.cca3 = action.payload.cca3
            state.population = action.payload.population
            state.latest = action.payload.latest
            state.timeline = action.payload.timeline
        }
    }
})

// action creators
export const setCovidCountry = (covidCountry: Country) => ({
    type: 'covid/setCovidCountry',
    payload: covidCountry
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
            const response: CovidCountryResponse = await axios.get(
                `${process.env.REACT_APP_CORONA_API}/countries/${cca2}`
            )

            const { name, code, population, latest_data, timeline } =
                response.data.data

            console.log('response: ', response)
            dispatch(
                setCovidCountry({
                    name,
                    cca2: code,
                    population,
                    latest: latest_data,
                    timeline
                })
            )
        } catch (error) {
            console.log('Error while loading country covid data: ', error)
        }
    }
}

export default covidSlice
