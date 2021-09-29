import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board } from '../interfaces'

interface BoardState {
    board: Board
}

const initialState: BoardState = {
    board: 'world'
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoard(state, action: PayloadAction<Board>) {
            state.board = action.payload
        }
    }
})

export const setBoard = (board: Board) => ({
    type: 'board/setBoard',
    payload: board
})

export const boardActions = boardSlice.actions
export default boardSlice
