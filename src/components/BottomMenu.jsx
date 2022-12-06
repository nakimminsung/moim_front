import * as React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import MiniCard from './MiniCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MapIcon from '@mui/icons-material/Map';
import {useEffect} from 'react';
import {useState} from 'react';

function ScrollTop(props) {
	const {children, window} = props;
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});
	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector(
			'#back-to-top-anchor',
		);
		if (anchor) {
			anchor.scrollIntoView({
				block: 'center',
			});
		}
	};
	return (
		<Fade in={trigger}>
			<Box
				onClick={handleClick}
				role='presentation'
				style={{zIndex: '999'}}
			>
				{children}
			</Box>
		</Fade>
	);
}
ScrollTop.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};

export default function BasicSpeedDial(props) {
	const [data, setData] = useState([]);
	useEffect(() => {
		setData(JSON.parse(sessionStorage.getItem('watched')));
		console.log(sessionStorage.getItem('watched'));
	}, [sessionStorage.getItem('watched')]);
	return (
		<>
			<Wrapper
				sx={{
					transform: 'translateZ(0px)',
					flexGrow: 1,
				}}
			>
				<BtnWrapper>
					<MoimBtn>M</MoimBtn>
					<WishBtn>
						<FavoriteIcon style={{fontSize: '30px'}} />
					</WishBtn>
					<MapBtn>
						<MapIcon style={{fontSize: '30px'}} />
					</MapBtn>
				</BtnWrapper>
				<CardWrapper>
					{data && data.length !== 0
						? data
								.slice(0, 3)
								.map((item, i) => <MiniCard num={item} />)
						: ''}
				</CardWrapper>
				<ScrollTop {...props} aria-label='scroll back to top'>
					<Fab size='small'>
						<KeyboardArrowUpIcon />
					</Fab>
				</ScrollTop>
			</Wrapper>
		</>
	);
}

const MoimBtn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #704de4;
	color: white;
	border-radius: 100%;
	width: 70px;
	height: 70px;
	cursor: pointer;
	font-weight: 900;
	font-size: 30px;
`;
const WishBtn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #e55682;
	color: white;
	border-radius: 100%;
	width: 70px;
	height: 70px;
	cursor: pointer;
	font-weight: 900;
`;
const MapBtn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #e55682;
	color: white;
	border-radius: 100%;
	width: 70px;
	height: 70px;
	cursor: pointer;
	font-weight: 900;
`;
const CardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Wrapper = styled(Box)`
	position: fixed;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	bottom: 100px;
	right: 10px;
	height: 600px;
	border: 1px solid gray;
`;
const BtnWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height: 230px;
	margin-bottom: 20px;
`;
