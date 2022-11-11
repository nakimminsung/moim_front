import React from 'react';
import styled from '@emotion/styled/macro';
import {Typography} from '@mui/material';

function Title(props) {
	const {data} = props;
	return <Wrapper>{data.title}</Wrapper>;
}

export default Title;

const Wrapper = styled(Typography)`
	background-color: #9b4de3;
	color: #ffff33;
	font-size: 30px;
	padding: 10px;
`;
