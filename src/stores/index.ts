import { configureStore } from '@reduxjs/toolkit'
import kinopoiskSllice from './slices/kinopoiskSllice'
import detailFilmSlice from './slices/detailFilmSlice'

export const store = configureStore({
	reducer: {
		kinopoisk: kinopoiskSllice,
		detailFilm: detailFilmSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
