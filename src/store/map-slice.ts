import { batch } from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '.'
import { MapboxStyle, ViewState } from '../interfaces'
import { getFitBounds, getFeatureByAplha2 } from '../utils/utils'
import { setCountryFeature } from './country-slice'
import { BOARD_WIDTH } from '../consts'

interface MapState {
    mapStyle: MapboxStyle
    viewState: ViewState
    mapWidth: number
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
        transitionDuration: 'auto'
    },
    mapWidth: window.innerWidth - BOARD_WIDTH
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
        },
        setMapWidth(state, action: PayloadAction<number>) {
            state.mapWidth = action.payload
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
export const setMapWidth = (width: number) => ({
    type: 'map/setMapWidth',
    payload: width
})

export const fitToBounds = (alpha2Code: string): AppThunk => {
    return (dispatch, getState) => {
        const { viewState } = getState().map
        const bounds = getFitBounds(alpha2Code, viewState)

        if (bounds) {
            const { longitude, latitude, zoom } = bounds
            batch(() => {
                dispatch(setCountryFeature(getFeatureByAplha2(alpha2Code)))
                dispatch(setViewState({ latitude, longitude, zoom }))
            })
        }
    }
}

export const mapActions = mapSlice.actions
export default mapSlice
