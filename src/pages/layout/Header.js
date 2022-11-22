import { CodeSharp, Menu, SearchRounded } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import mlogo from '../../asset/logo/m_logo.png';
import jwt_decode from "jwt-decode";
import './Header.css';

function Header(props) {
	const navi = useNavigate();
	//useState 가 아닌 버튼 클릭 시 searchWord에 저장되도록 Ref 사용
	const input = useRef(null);
	const [loginCheck, setLoginCheck] = useState("");

	const [isAppInstallHover, setIsAppInstallHover] = useState(false);
	const [isCallCenterHover, setIsCallCenterHover] = useState(false);
	const [isMyInfoHover, setIsMyInfoHover] = useState(false);
	const [isCategoryHover, setIsCategoryHover] = useState(false);
	const [isTopHover, setIsTopHover] = useState(false);

	const [email, setEmail] = useState("");
	const [searchWord, setSearchWord] = useState('');
	const goMypage = () => {
		try {
			if (localStorage.getItem("token") === null) {
				alert("로그인 해주세요.");
				document.location.href = "/login";
			} else {
				document.location.href = "/mypage";
			}
		} catch (e) {
			console.log(e);
		}
	};

	const logout = () => {
		try {
			localStorage.clear();
			document.location.href = "/";
		} catch (e) {
			console.log(e);
		}
	};

	//input text 에 엔터키 적용시키기
	const handleOnKeyPress = (e) => {
		if (e.key === 'Enter') {
			// Enter 입력이 되면
			handleClick(); //검색 버튼 클릭 이벤트 실행
		}
	};

	//검색 버튼 클릭 시 이벤트
	const handleClick = (e) => {
		//searchWord에 입력값 저장
		// console.log(input.current.value);
		//setSearchWord(input.current.value);
		const searchWord = input.current.value;
		console.log(searchWord);
		navi('/searchroom?searchWord=' + searchWord);
	};

	useEffect(() => {
		try {
			if (localStorage.getItem("token") !== null) {
				setLoginCheck(true);
			} else {
				setLoginCheck(false);
			}
		} catch (error) {
			console.log("error: " + JSON.stringify(localStorage));
		}
	}, [loginCheck]);


	return (
		<header className='layHeader'>
			<div style={{ display: 'flex', justifyContent: 'space-around' }}>
				<div
					className='logo'
					style={{
						paddingLeft: '30px',
						width: '300px',
					}}
				>
					<NavLink to={'/'} className='logoLink'>
						<span className='logo_span' style={{ cursor: 'pointer' }}>
							<img className='headerLogo' alt='' src={mlogo} />
							<b
								style={{
									fontSize: '40px',
								}}
							>
								MoiM
							</b>
						</span>
					</NavLink>
				</div>

				<div className='headerSearch'>
					<SearchRounded
						style={{
							fontSize: '40px',
							marginTop: '7px',
							marginLeft: '10px',
							marginRight: '20px',
							cursor: 'pointer',
							color: 'gray',
						}}
						onClick={handleClick}
					/>
					<input
						type={'text'}
						className='searchBox'
						placeholder='지역, 공간유형, 공간명으로 찾아보세요'
						ref={input}  // ref에 input 값
						onKeyPress={handleOnKeyPress}
					/>
				</div>

				<div className='headerRight'>
					<span style={{ width: '200px', fontSize: '18px' }}>
						<NavLink to={'/'}>내 공간 등록하기</NavLink>
					</span>
					&emsp;&emsp;
					<NavLink to={'/'}>
						<Menu
							style={{
								fontSize: '36px',
								marginTop: '8px',
								cursor: 'pointer',
							}}
						/>
					</NavLink>
				</div>

				<Fr>
					{loginCheck ? (
						<>
							<NavBtnUiDropdown>
								<BtnDropdown
									onMouseOver={() => setIsMyInfoHover(true)}
									onMouseOut={() => setIsMyInfoHover(false)}
								>
									{jwt_decode(localStorage.getItem("token")).nickname}님
								</BtnDropdown>
								<MyDropdown
									onMouseOver={() => setIsMyInfoHover(true)}
									onMouseOut={() => setIsMyInfoHover(false)}
									isMyInfoHover={isMyInfoHover}
								>

									<CustomerLi>
										<CustomerA href="/mypage">회원 정보관리</CustomerA>
									</CustomerLi>
									<AddBorder
										onClick={() => {
											logout();
											console.log("로그아웃! body: " + email);
										}}
									>
										로그아웃
									</AddBorder>
								</MyDropdown>
							</NavBtnUiDropdown>
						</>
					) : (
						<>
							<GnbLoginBtn href="/signup">회원가입</GnbLoginBtn>
							<GnbLoginBtn href="/login">로그인</GnbLoginBtn>

						</>
					)}
				</Fr>

			</div>
		</header>
	);
}



const Fr = styled.nav`
display: block;
float: right;
}
`;
const NavBtnUiDropdown = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding: 0 13.5px;
  font-size: 11px;
  position: relative;
`;
const GnbLoginBtn = styled.a`
  display: inline-block;
  vertical-align: middle;
  padding: 0 13.5px;
  font-size: 11px;
`;
const BtnDropdownReset = styled.input`
  cursor: pointer;
  padding: 0;
  background: transparent;
`;

const CustomerLi = styled.li`
  padding: 4px 0;
  width: 80px;
  font-size: 11px;
  color: #666;
  list-style: none;
`;

const BtnDropdown = styled.button`
  height: 20px;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
`;

const AddBorder = styled.li`
  border-top: 1px solid #d9d9d9;
  padding: 4px 0;
  width: 80px;
  font-size: 11px;
  color: #666;
  list-style: none;
`;
const CustomerA = styled.a`
  padding: 0 !important;
  width: 100%;
  height: 100%;

  &:hover {
    color: #f1c333;
  }
`;
const MyDropdown = styled.ul`
  display: none;
  position: absolute;
  width: auto;
  // margin-top: 3px;
  margin-left: -33px;
  padding: 8px 12px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 10%);
  border-radius: 4px;
  border: solid 1px #d9d9d9;
  z-index: 111;
  background: #fff;

  ${(props) =>
		props.isMyInfoHover &&
		css`
      display: block;
    `}

  &:before {
    content: "";
    position: absolute;
    border: 6px solid #d9d9d9;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    top: -12px;
    left: 50%;
    margin-left: -6px;
  }

  &:after {
    content: "";
    position: absolute;
    border: 4px solid #fff;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    top: -8px;
    left: 50%;
    margin-left: -4px;
  }
`;

export default Header;
