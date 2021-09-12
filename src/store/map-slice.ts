import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MapboxStyle, ViewState } from '../interfaces'

interface MapState {
    mapStyle: MapboxStyle
    viewState: ViewState
}

const initialState: MapState = {
    mapStyle: 'streets-v11',
    viewState: {
        bearing: 0,
        height: 0,
        latitude: 7.100892668623654,
        longitude: 80.15625000000001,
        pitch: 0,
        width: 0,
        zoom: 4,
        transitionDuration: 'auto'
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

export const mapActions = mapSlice.actions
export default mapSlice
