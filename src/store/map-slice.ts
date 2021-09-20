import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '.'
import { MapboxStyle, ViewState } from '../interfaces'
import { getFitBounds } from '../utils/utils'

interface MapState {
    mapStyle: MapboxStyle
    viewState: ViewState
}

const initialState: MapState = {
    mapStyle: 'dark-v10',
    viewState: {
        bearing: 0,
        height: 0,
        latitude: 43.047295,
        longitude: 11.753803,
        pitch: 0,
        width: 0,
        zoom: 1.5,
        minZoom: 1.5,
        transitionDuration: 1000
    }
}

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMapStyle(state, action: PayloadAction<MapboxStyle>) {
            state.mapStyle = action.payload
        },
        setViewState(state, action: PayloadAction<ViewState>) {
            state.viewState = { ...state.viewState, ...action.payload }
        }
    }
})

export const setMapStyle = (mapStyle: MapboxStyle) => ({
    type: 'map/setMapStyle',
    payload: mapStyle
})
export const setViewState = (viewState: ViewState) => ({
    type: 'map/setViewState',
    payload: viewState
})

export const fitToBounds = (alpha3Code: string): AppThunk => {
    return (dispatch, getState) => {
        const { viewState } = getState().map
        const { longitude, latitude, zoom } = getFitBounds(
            alpha3Code,
            viewState
        )
        dispatch(setViewState({ latitude, longitude, zoom }))
    }
}

export const mapActions = mapSlice.actions
export default mapSlice
