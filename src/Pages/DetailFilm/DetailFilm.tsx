import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hook'
import { fetchDetailFilmById } from '../../stores/slices/detailFilmSlice'
import { useSearchParams } from 'react-router-dom'

const DetailFilm: FC = () => {
	const dispatch = useAppDispatch()
	const [searchParams] = useSearchParams()
	const [query] = React.useState(searchParams.get('film'))
	const { detail, error, loading } = useAppSelector(state => state.detailFilm)

	React.useEffect(() => {
		query && dispatch(fetchDetailFilmById(query))
	}, [dispatch, query])

	const countriesArray = detail?.countries.map(el => {
		for (let key in el) {
			return el[key]
		}
	})

	const genreArray = detail?.genres?.map(el => {
		for (let key in el) {
			return el[key]
		}
	})

	return (
		<div>
			{loading ? (
				<h1>Loading...</h1>
			) : error ? (
				<span className='error'>{error}</span>
			) : (
				<>
					<h1>
						{detail?.nameOriginal
							? detail.nameOriginal
							: detail?.nameEn
							? detail.nameEn
							: detail?.nameRu}
					</h1>
					<img
						width={200}
						src={detail?.posterUrl}
						alt={
							detail?.nameOriginal
								? detail.nameOriginal
								: detail?.nameEn
								? detail.nameEn
								: detail?.nameRu
						}
					/>
					<p>{detail?.description}</p>
					<ol>
						Genre:
						{genreArray?.map((el, i) => (
							<li key={i}>{el}</li>
						))}
					</ol>
					<ol>
						Country:
						{countriesArray?.map((el, i) => (
							<li key={i}>{el}</li>
						))}
					</ol>
					<h2>Film length{detail?.filmLength}</h2>
					<h2>Has Film 3D{detail?.has3D}</h2>
					<h2>Is Ticket Available{detail?.isTicketsAvailable}</h2>
					<h2>Film rating age limits{detail?.ratingAgeLimits}</h2>
					<h2>Film short description{detail?.shortDescription}</h2>
					<h2>Film type{detail?.type}</h2>
					<h2>Film year{detail?.year}</h2>
				</>
			)}
		</div>
	)
}

export default DetailFilm
