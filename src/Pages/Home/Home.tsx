import React, { FC, useEffect } from 'react'
import Header from '../../components/Header/Header'
import Output from '../../components/Output/Output'
import { useAppDispatch } from '../../stores/hook'
import { fetchAllFilms } from '../../stores/slices/kinopoiskSllice'

const Home: FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchAllFilms())
	}, [dispatch])
	return (
		<div>
			<Header />
			<Output />
		</div>
	)
}

export default Home
