type IObjectKey = {
	[key: string]: string | null
}

export type ICountry = IObjectKey & {
	country: string
}
export type IGenre = IObjectKey & {
	genre: string
}

export type IFilms = {
	kinopoiskId: string
	nameOriginal: string
	posterUrlPreview: string
	filmId: string
}

export type IFilmDetail = IFilms & {
	countries: ICountry[]
	description: null | string
	filmLength: number
	genres: IGenre[]
	has3D: boolean
	isTicketsAvailable: boolean
	nameEn: string
	nameRu: string
	posterUrl: string
	ratingAgeLimits: string
	ratingImdb: string
	ratingKinopoisk: string
	serial: boolean
	shortDescription: null | string
	type: string
	year: number
}
