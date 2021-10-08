import { batch } from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '.'
import { Board } from '../interfaces'
import { setMapWidth } from './map-slice'
import { BOARD_WIDTH } from '../consts'

interface BoardState {
    board: Board
    open: boolean
}

const initialState: BoardState = {
    board: 'world',
    open: true
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoard(state, action: PayloadAction<Board>) {
            state.board = action.payload
        },
        setOpen(state, action: PayloadAction<boolean>) {
            state.open = action.payload
        }
    }
})

export const setBoard = (board: Board) => ({
    type: 'board/setBoard',
    payload: board
})
export const setOpen = (open: boolean) => ({
    type: 'board/setOpen',
    payload: open
})

export const toggleBoard = (open: boolean): AppThunk => {
    return (dispatch, getState) => {
        batch(() => {
            dispatch(setOpen(open))
            dispatch(
                setMapWidth(
                    open ? window.innerWidth - BOARD_WIDTH : window.innerWidth
                )
            )
        })
    }
}

export const boardActions = boardSlice.actions
export default boardSlice
