import { configureStore } from '@reduxjs/toolkit'
import { GamesStatuSlice } from './slice/gamesSlice'

const store = configureStore({
    reducer: {
        [GamesStatuSlice.name]: GamesStatuSlice.reducer,
    },
    devTools: true,
})

export default store

