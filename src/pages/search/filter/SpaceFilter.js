import React, { useState, useRef, useEffect } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { data } from '../../thememap/data/Space';

// button theme
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	paper: {
		marginRight: theme.spacing(2),
	},
}));

export default function SpaceFilter(props) {
	const [open, setopen] = useState(false);
	const classes = useStyles();
	const anchorRef = useRef(null);
	const prevOpen = useRef(open);
	const [address, setAddress] = useState('');

	// open
	const handleToggle = () => {
		setopen((prevOpen) => !prevOpen);
	};
	// close
	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setopen(false);
	};
	// return focus to the button when we transitioned from !open -> open
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}
		prevOpen.current = open;
	}, [open, address]);

	const handleChange = (value) => {
		setAddress(value);
	};

	const filterRun = () => {
		props.setAddress(address);
		console.log(address);
	};

	return (
		<div className={classes.root}>
			<SpaceButton
				ref={anchorRef}
				aria-controls={open ? 'menu-list-grow' : undefined}
				aria-haspopup='true'
				onClick={handleToggle}
			>
				<span>전체지역</span>
				<ArrowDropDownIcon />
			</SpaceButton>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
				placement="bottom"

			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom'
									? 'center top'
									: 'center bottom',
							position: 'relative',
							left: '80px',
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<SpaceMenuList
									autoFocusItem={open}
									id='menu-list-grow'
								>
									<Wrapper>
										<Left>
											{data.map((item, i) => (
												<div
													onMouseOver={(e) => {
														handleChange(
															e.target.innerText,
														);
													}}
												>
													{item.address}
												</div>
											))}
										</Left>
										<Right>
											{data.map((item, i) =>
												item.address === address ? (
													<div>
														{item.detail.map(
															(item, i) => (
																<AddressDetail
																	onClick={() => {
																		handleClose(
																			false,
																		);
																		filterRun();
																	}}
																>
																	{item}
																</AddressDetail>
															),
														)}
													</div>
												) : (
													''
												),
											)}
										</Right>
									</Wrapper>
								</SpaceMenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
	);
}

const SpaceButton = styled.button`
	border: 1px solid lightgray;
	width: 100px;
	display: flex;
	justify-content: space-between;
	padding: 0 10px;
	margin-right: 10px;
	font-size: 15px;
	color: #808080;
	background-color: #fff;
	border-radius: 5px;
	align-items: center;
	padding-left: 20px;
	@media (max-width: 1920px) {
		width: 250px;
	}
	@media (max-width: 1680px) {
		width: 250px;
	}
	@media (max-width: 1000px) {
		width: 150px;
	}
	@media (max-width: 900px) {
		width: 150px;
	}
`;
const Wrapper = styled(Box)`
	display: flex;
	justify-content: space-between;
	background-color: #fff;
	padding: 0 10px;
`;
const Left = styled(Box)`
	width: 130px;
	text-align: center;
	position: sticky;
	top: 0;
	height: 100px;
	> div {
		padding: 10px 0;
		cursor: pointer;
		font-size: 17px;
		font-weight: 500;
		:hover {
			background-color: #f0f0f0;
			color: #9b4de3;
			font-weight: 700;
		}
	}
`;
const Right = styled(Box)`
	width: 270px;
	height: 700px;
`;
const AddressDetail = styled(Box)`
	padding: 10px 0;
	cursor: pointer;
	font-size: 15px;
	font-weight: 400;
	padding-left: 20px;
	:hover {
		background-color: #f0f0f0;
		color: #9b4de3;
		font-weight: 700;
	}
`;
const SpaceMenuList = styled(MenuList)`
	padding: 0;
	width: 400px;
	height: 700px;
	overflow: scroll;
	border-radius: 10px;
`;
