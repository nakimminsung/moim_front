import React from 'react';
import styled from '@emotion/styled/macro';
import {Box} from '@mui/material';

function Filter(props) {
	return <Wrapper>Filter</Wrapper>;
}

export default Filter;

const Wrapper = styled(Box)`
	border: 1px solid lightgray;
	width: 150px;
	height: 50px;
	cursor: pointer;
	border-radius: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 25px;
	font-weight: 1000;
	background-color: #fff;
`;
