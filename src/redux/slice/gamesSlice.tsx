import { createSlice } from '@reduxjs/toolkit'

export interface GamesInterface {
    pid: number;
    mp4name: string;
    romname: string;
    pinyin: string;
    title_cn: string;
    title_en: string;
    title_ko: string;
    title_es: string;
    title_jp: string;
    title_tw: string;
    is_show: boolean;
    is_favourite: boolean;
    dim_type: number;
    is_timer: boolean;
    load_time: number;
    category: number;
    resname: string;
    open_time: number;
    update_time: number;
    emu_id: number;
    emu_name: number | null;
    level: number;
    life: number;

    remark: number | null;
    is_comb: boolean;
}

export interface GamesState {
    games: GamesInterface[] | [];
    error: string | null;
    loading: boolean;
}

const initialState: GamesState = {
    games: [],
    error: null,
    loading: false
}

export const GamesStatuSlice = createSlice({
    name: 'Games',
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

export const { setGames, setError, clearGames } = GamesStatuSlice.actions

export const selectGames = (state: any) => state.Games.games;
export const selectGamesLoading = (state: any) => state.Games.loading;


export default GamesStatuSlice.reducer