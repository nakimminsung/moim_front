import React from 'react';
import styled from '@emotion/styled/macro';
import {Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router';

function Title(props) {
	const {themeData} = props;
	const navi = useNavigate();
	const {themeNum} = useParams();

	return (
		<Wrapper>
			<ThemeTitle>{themeData.title}</ThemeTitle>
			<CloseIcon
				style={{fontSize: '40px', color: 'yellow', cursor: 'pointer'}}
				onClick={() => navi('/theme/' + themeNum)}
			></CloseIcon>
		</Wrapper>
	);
}
export default Title;

const Wrapper = styled(Typography)`
	background-color: #9b4de3;
	font-size: 30px;
	padding: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
`;
const ThemeTitle = styled.span`
	color: #ffff33;
	font-size: 30px;
	font-weight: 700;
`;
