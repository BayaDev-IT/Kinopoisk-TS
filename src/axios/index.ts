import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://kinopoiskapiunofficial.tech/api',
	headers: {
		'X-API-KEY': '4619fe09-3a78-48fd-aa17-270c51227cd2',
		'Content-Type': 'application/json',
	},
})

export const kinopoiskAPI = {
	getAllFilm() {
		return instance.get('/v2.2/films')
	},
	getDetailFilmById(id: string) {
		return instance.get(`/v2.2/films/${id}`)
	},
	getFilmByKeyWord(value: string) {
		return instance.get(`v2.1/films/search-by-keyword?keyword=${value}`)
	},
	getFilmPremier(year: number, month: string) {
		return instance.get(`v2.2/films/premieres?year=${year}&month=${month}`)
	},
}
