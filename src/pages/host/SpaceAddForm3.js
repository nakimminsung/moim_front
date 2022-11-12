import {ClassNames} from '@emotion/react';
import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@material-ui/core';
import React, {useEffect, useState} from 'react';

function SpaceAddForm3(props) {
	const timeArr = Array.from(Array(25), (v, i) => i + 0);
	const [stime, setStime] = useState('0');
	const [etime, setEtime] = useState('24');

	const stiemeOnchange = (e) => {
		setStime(e.target.value);
	};
	const etiemeOnchange = (e) => {
		setEtime(e.target.value);
	};
	useEffect(() => {
		console.log(stime);
		console.log(etime);
	}, [stime, etime]);

	return (
		<div>
			<div>
				<h1>이용 정보를 입력하세요</h1>
			</div>
			<div>
				<div className='headcount'>
					<h4>인원수</h4>
					<TextField
						id='outlined-full-width'
						style={{margin: 8}}
						placeholder='최대 인원수를 입력해주세요'
						required
						type={'number'}
						margin='normal'
						InputProps={{inputProps: {min: 0, max: 10}}}
						variant='outlined'
						size='small'
					/>
					<b>명</b>
				</div>
				<div className='operating'>
					<h4>이용시간</h4>
					<div>
						<FormControl
							variant='outlined'
							className={ClassNames.formControl}
						>
							<Select
								native
								defaultValue={0}
								onChange={stiemeOnchange}
								inputProps={{
									id: 'outlined-age-native-simple',
								}}
							>
								{timeArr.map((stime, i) => (
									<option
										aria-label='None'
										value={stime}
										key={i}
									>
										{stime < 10 ? '0' + stime : stime}
									</option>
								))}
							</Select>
						</FormControl>
						<FormControl
							variant='outlined'
							className={ClassNames.formControl}
						>
							<Select
								native
								defaultValue={24}
								onChange={etiemeOnchange}
								inputProps={{
									id: 'outlined-age-native-simple',
								}}
							>
								{timeArr.map((etime, i) => (
									<option
										aria-label='None'
										value={etime}
										key={i}
									>
										{etime < 10 ? '0' + etime : etime}
									</option>
								))}
							</Select>
						</FormControl>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SpaceAddForm3;
