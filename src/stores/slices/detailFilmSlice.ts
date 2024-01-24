import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { kinopoiskAPI } from '../../axios'
import { type } from 'os'
import { IFilmDetail } from '../modules'

type IDetailState = {
	loading: boolean
	error: null | string | undefined
	detail: IFilmDetail | null
}

const initialState: IDetailState = {
	loading: false,
	error: null,
	detail: null,
}

export const fetchDetailFilmById = createAsyncThunk<
	IFilmDetail,
	string,
	{ rejectValue: string }
>('detail/fetchDetailFilmById', async (id, { rejectWithValue }) => {
	try {
		const res = await kinopoiskAPI.getDetailFilmById(id)
		if (res.status !== 200) {
			throw new Error('Server error')
		}
		return res.data
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

// export const fetchFilmPremier = createAsyncThunk<
// 	IFilmDetail[],
// 	{ year: number; month: string },
// 	{ rejectValue: string }
// >('kinopoisk/fetchFilmPremier', async (valuePremier, { rejectWithValue }) => {
// 	try {
// 		const res = await kinopoiskAPI.getFilmPremier(
// 			valuePremier.year,
// 			valuePremier.month
// 		)
// 		if (res.status !== 200) {
// 			throw new Error('Server error')
// 		}
// 		return res.data.films
// 	} catch (error) {
// 		if (error instanceof AxiosError) {
// 			const message =
// 				(error.response &&
// 					error.response.data &&
// 					error.response.data.message) ||
// 				error.message ||
// 				error.toString()
// 			return rejectWithValue(message)
// 		}
// 		// unhandled non-AxiosError goes here
// 		throw error
// 	}
// })

const detailFilmSlice = createSlice({
	name: 'detail',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(fetchDetailFilmById.pending, state => {
			state.error = null
			state.loading = true
		})
		addCase(fetchDetailFilmById.fulfilled, (state, action) => {
			state.detail = action.payload
			state.loading = false
		})
		addCase(fetchDetailFilmById.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
		// addCase(fetchFilmPremier.pending, state => {
		// 	state.error = null
		// 	state.loading = true
		// })
		// addCase(fetchFilmPremier.fulfilled, (state, action) => {
		// 	state.detail = action.payload
		// 	state.loading = false
		// })
		// addCase(fetchFilmPremier.rejected, (state, action) => {
		// 	state.loading = false
		// 	if (action.payload?.includes('404')) {
		// 		state.error = ' 404 Not found!'
		// 	} else {
		// 		state.error = action.payload
		// 	}
		// })
	},
})

export default detailFilmSlice.reducer
