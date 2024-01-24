import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { kinopoiskAPI } from '../../axios'
import { IFilms } from '../modules'

type IKinopoiskState = {
	loading: boolean
	error: null | string | undefined
	list: IFilms[]
}

const initialState: IKinopoiskState = {
	loading: false,
	error: null,
	list: [],
}

export const fetchAllFilms = createAsyncThunk<
	IFilms[],
	void,
	{ rejectValue: string }
>('kinopoisk/fetchAllFilms', async (_, { rejectWithValue }) => {
	try {
		const res = await kinopoiskAPI.getAllFilm()
		if (res.status !== 200) {
			throw new Error('Server error')
		}
		return res.data.items
	} catch (error) {
		if (error instanceof AxiosError) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return rejectWithValue(message)
		}
		// unhandled non-AxiosError goes here
		throw error
	}
})

export const fetchFilmByKeyWord = createAsyncThunk<
	IFilms[],
	string,
	{ rejectValue: string }
>('kinopoisk/fetchFilmByKeyWord', async (value, { rejectWithValue }) => {
	try {
		const res = await kinopoiskAPI.getFilmByKeyWord(value)
		if (res.status !== 200) {
			throw new Error('Server error')
		}
		return res.data.films
	} catch (error) {
		if (error instanceof AxiosError) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return rejectWithValue(message)
		}
		// unhandled non-AxiosError goes here
		throw error
	}
})

export const fetchFilmPremier = createAsyncThunk<
	IFilms[],
	{ year: number; month: string },
	{ rejectValue: string }
>('kinopoisk/fetchFilmPremier', async (valuePremier, { rejectWithValue }) => {
	try {
		const res = await kinopoiskAPI.getFilmPremier(
			valuePremier.year,
			valuePremier.month
		)

		if (res.status !== 200) {
			throw new Error('Server error')
		}
		return res.data.items
	} catch (error) {
		if (error instanceof AxiosError) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return rejectWithValue(message)
		}
		// unhandled non-AxiosError goes here
		throw error
	}
})

const kinopoiskSlice = createSlice({
	name: 'kinopoisk',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(fetchAllFilms.pending, state => {
			state.error = null
			state.loading = true
		})
		addCase(fetchAllFilms.fulfilled, (state, action) => {
			state.list = action.payload
			state.loading = false
		})
		addCase(fetchAllFilms.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
		addCase(fetchFilmByKeyWord.pending, state => {
			state.error = null
			state.loading = true
		})
		addCase(fetchFilmByKeyWord.fulfilled, (state, action) => {
			state.list = action.payload
			state.loading = false
		})
		addCase(fetchFilmByKeyWord.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
		addCase(fetchFilmPremier.pending, state => {
			state.error = null
			state.loading = true
		})
		addCase(fetchFilmPremier.fulfilled, (state, action) => {
			state.list = action.payload
			state.loading = false
		})
		addCase(fetchFilmPremier.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
	},
})

export default kinopoiskSlice.reducer
