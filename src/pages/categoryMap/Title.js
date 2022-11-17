import React from 'react';
import styled from '@emotion/styled/macro';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

function Title(props) {
    const { categoryData } = props;
    const navi = useNavigate();
    const { categoryNum } = useParams();

    return (
        <Wrapper>
            <ThemeTitle>{categoryData.cname}</ThemeTitle>
            <CloseIcon
                style={{ fontSize: '40px', color: 'white', cursor: 'pointer' }}
                onClick={() => navi('/categoryroomList/' + categoryNum)}
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
`;

const ThemeTitle = styled(Typography)`
	color: white;
    font-weight:20px;
	font-size: 30px;
`;
