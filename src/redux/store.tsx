import { configureStore } from '@reduxjs/toolkit'
import { GamesStatuSlice } from './slice/gamesSlice'
import { GamesLibStatuSlice } from './slice/gamesLibSlice'

const store = configureStore({
    reducer: {
        [GamesStatuSlice.name]: GamesStatuSlice.reducer,
        [GamesLibStatuSlice.name]: GamesLibStatuSlice.reducer
    },
    devTools: true,
})

export default store

