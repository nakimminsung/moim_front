import React, {useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from '@emotion/styled/macro';
import {Box} from '@mui/material';

function BottomMenu(props) {
	const [sort, setSort] = useState('num');

	// 공간 정렬
	const handleChange = (e) => {
		setSort(e.target.value);
		console.log(sort);
	};
	return (
		<Wrapper>
			<RightWrapper>
				<div
					style={{
						width: '100px',
						height: '40px',
						border: '1px solid lightgray',
						borderRadius: '20px',
						cursor: 'pointer',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginRight: '10px',
						backgroundColor: '#fff',
					}}
				>
					바로 결제
				</div>
				<div
					style={{
						width: '100px',
						height: '40px',
						border: '1px solid lightgray',
						borderRadius: '20px',
						cursor: 'pointer',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#fff',
					}}
				>
					쿠폰 할인
				</div>
			</RightWrapper>
			<LeftWrapper>
				<SelectDiv
					style={{backgroundColor: 'white', borderRadius: '5px'}}
				>
					<FormControl sx={{m: 1, minWidth: 120}} size='small'>
						<Select
							labelId='demo-select-small'
							id='demo-select-small'
							defaultValue={'num'}
							onChange={handleChange}
						>
							<MenuItem value={'num'}>최신순</MenuItem>
							<MenuItem value={'readCount'}>인기순</MenuItem>
							<MenuItem value={'weekAmPrice'}>가격순</MenuItem>
						</Select>
					</FormControl>
				</SelectDiv>
			</LeftWrapper>
		</Wrapper>
	);
}

export default BottomMenu;

const Wrapper = styled(Box)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 60px;
	align-items: center;
	background-color: #f5f5f5;
`;
const RightWrapper = styled(Box)`
	display: flex;
	align-items: center;
	width: 30%;
`;
const LeftWrapper = styled(Box)`
	display: flex;
	align-items: center;
	width: 30%;
	justify-content: flex-end;
	padding: 0 10px;
`;
const SelectDiv = styled(Box)`
	display: flex;
	justify-content: flex-end;
	margin: 20px 0;
`;
