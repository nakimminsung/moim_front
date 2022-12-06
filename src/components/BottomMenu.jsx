import * as React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import MiniCard from './MiniCard';
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
				sx={{position: 'fixed'}}
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
	}, []);
	useEffect(() => {
		setData(JSON.parse(sessionStorage.getItem('watched')));
		console.log(data);
	}, []);
	return (
		<>
			{sessionStorage.getItem('watched') !== null ? (
				<OnWrapper>
					<Wrapper
						sx={{
							transform: 'translateZ(0px)',
							flexGrow: 1,
						}}
					>
						<div
							style={{
								letterSpacing: '-1px',
								fontWeight: '900',
								padding: '5px',
								color: '#707070',
							}}
						>
							최근 본 상품
						</div>
						<CardWrapper>
							{JSON.parse(sessionStorage.getItem('watched'))
								.slice(0, 4)
								.reverse()
								.map((item, i) => (
									<MiniCard num={item} />
								))}
							<MoreBtn>More</MoreBtn>
						</CardWrapper>
					</Wrapper>
					<ScrollTop {...props}>
						<MoreBtn
							size='small'
							aria-label='scroll back to top'
							style={{
								position: 'relative',
								top: '42px',
								height: '30px',
								width: '80px',
							}}
						>
							<KeyboardArrowUpIcon />
						</MoreBtn>
					</ScrollTop>
				</OnWrapper>
			) : (
				<NoneWrapper
					sx={{
						transform: 'translateZ(0px)',
						flexGrow: 1,
					}}
				>
					<ScrollTop {...props}>
						<TopBtn
							size='small'
							aria-label='scroll back to top'
							style={{backgroundColor: '#f0f0f0'}}
						>
							<KeyboardArrowUpIcon />
						</TopBtn>
					</ScrollTop>
					<ScrollTop {...props}>
						<TopBtn
							size='small'
							aria-label='scroll back to top'
							style={{backgroundColor: '#f0f0f0'}}
						>
							<KeyboardArrowUpIcon />
						</TopBtn>
					</ScrollTop>
				</NoneWrapper>
			)}
		</>
	);
}

const TopBtn = styled.div`
	font-weight: 900;
	padding: 5px;
	color: #707070;
	border-radius: 50px;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	cursor: pointer;
	@media (max-width: 1920px) {
		width: 50px;
		height: 50px;
		font-size: 12px;
	}
	@media (max-width: 1680px) {
		width: 50px;
		height: 50px;
		font-size: 12px;
	}
	@media (max-width: 1000px) {
		width: 50px;
		height: 50px;
		font-size: 12px;
	}
	@media (max-width: 900px) {
		width: 50px;
		height: 50px;
		font-size: 12px;
	}
`;
const MoreBtn = styled.div`
	font-weight: 900;
	padding: 5px;
	border: 1px solid #d0d0d0;
	color: #707070;
	border-radius: 5px;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	cursor: pointer;
	@media (max-width: 1920px) {
		width: 100px;
		height: 20px;
		font-size: 12px;
	}
	@media (max-width: 1680px) {
		width: 100px;
		height: 20px;
		font-size: 12px;
	}
	@media (max-width: 1000px) {
		width: 70px;
		height: 20px;
		font-size: 12px;
	}
	@media (max-width: 900px) {
		width: 70px;
		height: 20px;
		font-size: 12px;
	}
`;
const CardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #f0f0f0;
	padding: 10px;
	border-radius: 0 0 10px 10px;
`;
const Wrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const OnWrapper = styled(Box)`
	position: fixed;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	border: 1px solid #d0d0d0;
	border-radius: 10px;
	z-index: 10;
	@media (max-width: 1920px) {
		bottom: 60px;
		right: 20px;
	}
	@media (max-width: 1680px) {
		bottom: 60px;
		right: 20px;
	}
	@media (max-width: 1000px) {
		bottom: 50px;
		right: 9px;
	}
	@media (max-width: 900px) {
		bottom: 50px;
		right: 9px;
	}
`;
const NoneWrapper = styled(Box)`
	position: fixed;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 1px solid #d0d0d0;
	z-index: 10;
	@media (max-width: 1920px) {
		bottom: 40px;
		right: 40px;
	}
	@media (max-width: 1680px) {
		bottom: 40px;
		right: 40px;
	}
	@media (max-width: 1000px) {
		bottom: 40px;
		right: 40px;
	}
	@media (max-width: 900px) {
		bottom: 40px;
		right: 40px;
	}
`;
