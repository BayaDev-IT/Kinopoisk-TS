import React, { FC, FormEventHandler } from 'react'
import { useAppDispatch } from '../../stores/hook'
import {
	fetchFilmByKeyWord,
	fetchFilmPremier,
} from '../../stores/slices/kinopoiskSllice'
import './Header.css'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'

const Header: FC = () => {
	const [value, setValue] = React.useState('')
	const [year, setYear] = React.useState('')
	const [month, setMonth] = React.useState('January')
	const dispatch = useAppDispatch()

	const handleSearchForm: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
		if (value.trim().length) {
			dispatch(fetchFilmByKeyWord(value))
		}
	}

	const handleSearchYear: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
		const yearNumber: number = parseInt(year, 10)
		dispatch(fetchFilmPremier({ year: yearNumber, month }))
	}
	return (
		<header className='header'>
			<form onSubmit={handleSearchForm}>
				<TextField
					value={value}
					onChange={e => setValue(e.target.value)}
					id='outlined-basic'
					type='text'
					label='Search film'
					variant='outlined'
				/>
				<button>Search</button>
			</form>

			<form onSubmit={handleSearchYear}>
				<TextField
					value={year}
					onChange={e => setYear(e.target.value)}
					id='outlined-basic'
					type='number'
					label='Enter year'
					variant='outlined'
				/>
				<select value={month} onChange={e => setMonth(e.target.value)}>
					<option value='January'>January</option>
					<option value='February'>February</option>
					<option value='March'>March</option>
					<option value='April'>April</option>
					<option value='May'>May</option>
					<option value='June'>June</option>
					<option value='July'>July</option>
					<option value='August'>August</option>
					<option value='September'>September</option>
					<option value='October'>October</option>
					<option value='November'>November</option>
					<option value='December'>December</option>
				</select>
				<button>Search</button>
			</form>
		</header>
	)
}

export default Header
