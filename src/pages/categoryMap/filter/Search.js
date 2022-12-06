import React, { useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@material-ui/core';
import styled from 'styled-components';

function Search(props) {
	const searchRef = useRef('');

	return (
		<SearchBox>
			<Icon onClick={() => props.setRoomName(searchRef.current)} />
			<SearchInput
				type='text'
				placeholder='공간명 검색'
				onChange={(e) => {
					searchRef.current = e.target.value;
				}}
				onKeyUp={(e) =>
					e.keyCode === 13 ? props.setRoomName(searchRef.current) : ''
				}
			/>
		</SearchBox>
	);
}

export default Search;

const SearchBox = styled(Box)`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	height: 100%;
	min-height: 55px;
	padding: 0 20px;
	position: relative;
	border: 1px solid #d0d0d0;
	border-radius: 5px;
`;
const Icon = styled(SearchIcon)`
	position: absolute;
	z-index: 1;
	color: #a0a0a0;
	cursor: pointer;
`;
const SearchInput = styled.input`
	width: 100%;
	background-color: white;
	border: 0px;
`;
