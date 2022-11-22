import React, {useEffect, useState} from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import DehazeIcon from '@material-ui/icons/Dehaze';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import {useNavigate} from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import jwt_decode from 'jwt-decode';

export default function MyMenu() {
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const navi = useNavigate();

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};
	// const profileImage = jwt_decode(
	// 	localStorage.getItem('token'),
	// ).profile_image;

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
	};

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	const [loginCheck, setLoginCheck] = useState('');

	const goMypage = () => {
		try {
			if (localStorage.getItem('token') === null) {
				alert('로그인 해주세요.');
				document.location.href = '/login';
			} else {
				document.location.href = '/mypage';
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		try {
			if (localStorage.getItem('token') !== null) {
				setLoginCheck(true);
			} else {
				setLoginCheck(false);
			}
		} catch (error) {
			console.log('error: ' + JSON.stringify(localStorage));
		}
	}, [loginCheck]);

	const logout = () => {
		try {
			localStorage.clear();
			document.location.href = '/';
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<MyButton
				ref={anchorRef}
				aria-controls={open ? 'menu-list-grow' : undefined}
				aria-haspopup='true'
				onClick={handleToggle}
			>
				<MyButtonIcon />
				{loginCheck ? (
					<Avatar
						className='loginAvatar'
						alt='Remy Sharp'
						src={
							jwt_decode(localStorage.getItem('token'))
								.profile_image
						}
					/>
				) : (
					<AccountCircleIcon className='noneIcon' />
				)}
			</MyButton>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
			>
				{({TransitionProps, placement}) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom'
									? 'center top'
									: 'center bottom',
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									autoFocusItem={open}
									id='menu-list-grow'
								>
									{loginCheck ? (
										<>
											<MenuItem>
												{
													jwt_decode(
														localStorage.getItem(
															'token',
														),
													).nickname
												}
												님
											</MenuItem>
											<MenuItem
												onClick={() => {
													navi('/booking/list');
													handleClose(false);
												}}
											>
												예약 리스트
											</MenuItem>
											<MenuItem
												onClick={() => {
													navi('/');
													handleClose(false);
												}}
											>
												이용후기
											</MenuItem>
											<MenuItem
												onClick={() => {
													navi('/like');
													handleClose(false);
												}}
											>
												찜한 공간
											</MenuItem>
											<hr
												style={{
													margin: '0 auto',
													width: '90%',
													color: '#a0a0a0',
												}}
											/>
											<MenuItem
												onClick={() => {
													navi('/mypage');
													handleClose(false);
												}}
											>
												회원정보관리
											</MenuItem>
											<MenuItem
												onClick={() => {
													logout();
													handleClose();
												}}
											>
												로그아웃
											</MenuItem>
										</>
									) : (
										<>
											<MenuItem
												onClick={() => {
													navi('/login');
													handleClose(false);
												}}
											>
												로그인
											</MenuItem>
											<MenuItem
												onClick={() => {
													navi('/signup');
													handleClose(false);
												}}
											>
												회원가입
											</MenuItem>
										</>
									)}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
}

const MyButton = styled.button`
	width: 95px;
	height: 50px;
	border: 1px solid #e0e0e0;
	background-color: #fff;
	border-radius: 25px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 5px;
	padding-left: 10px;
	> svg.noneIcon {
		font-size: 40px;
		color: #505050;
	}
	> .loginAvatar {
		width: 35px;
		height: 35px;
	}
	:hover {
		box-shadow: 2px 2px 2px #f0f0f0;
	}
`;
const MyButtonIcon = styled(DehazeIcon)`
	font-size: 25px;
	color: #505050;
`;
