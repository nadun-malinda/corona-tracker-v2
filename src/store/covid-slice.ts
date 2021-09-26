import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from '.'
import axios from 'axios'
import { TimelineData } from '../interfaces'

interface fetchTimelineResponse {
    data: {
        data: TimelineData[]
    }
}

const initialState = {}

const covidSlice = createSlice({
    name: 'covid',
    initialState,
    reducers: {}
})

export const fetchGlobalTimeline = (): AppThunk<
    Promise<fetchTimelineResponse>
> => {
    return async () => {
        return await axios.get(`${process.env.REACT_APP_CORONA_API}/timeline`)
    }
}

export default covidSlice
