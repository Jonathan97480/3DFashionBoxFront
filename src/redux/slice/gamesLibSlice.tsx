import { createSlice } from '@reduxjs/toolkit'
import { libGameInterface } from '../../Components/RandomGame';


export interface GamesState {
    games: libGameInterface[] | [];
    error: string | null;
    loading: boolean;
}

const initialState: GamesState = {
    games: [],
    error: null,
    loading: false
}

export const GamesLibStatuSlice = createSlice({
    name: 'GamesLib',
    initialState,
    reducers: {
        setGames: (state, action) => {
            state.games = action.payload
            state.error = null
        },

        setError: (state, action) => {
            state.error = action.payload
        },
        clearGames: (state, action) => {
            state.games = []
            state.error = null
        }

    },
})

export const { setGames, setError, clearGames } = GamesLibStatuSlice.actions

export const selectGames = (state: any) => state.Games.games;
export const selectGamesLoading = (state: any) => state.Games.loading;


export default GamesLibStatuSlice.reducer