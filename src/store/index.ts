import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import mapSlice from './map-slice'
import boardSlice from './board-slice'
import countrySlice from './country-slice'

const store = configureStore({
    reducer: {
        map: mapSlice.reducer,
        board: boardSlice.reducer,
        country: countrySlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
export default store
