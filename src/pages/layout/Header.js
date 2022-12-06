import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {SearchRounded} from '@material-ui/icons';
import mlogo from '../../asset/logo/m_logo.png';
import MyMenu from '../../components/MyMenu';
import styled from 'styled-components';

//jwt user token
import jwt_decode from 'jwt-decode';
import axios from 'axios';

function Header(props) {
	//useState 가 아닌 버튼 클릭 시 searchWord에 저장되도록 Ref 사용
	const input = useRef(null);
	const navi = useNavigate();

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
		const searchWord = input.current.value;
		navi('/searchroom?searchWord=' + searchWord);
	};

	//token 에서 userInfo 가져오기
	const userNum = localStorage.getItem('token')
		? jwt_decode(localStorage.getItem('token')).idx
		: '';

	//호스트가 로그인했는지 체크하기위함
	const hostLoginOk = sessionStorage.loginok;

	//grade 담기위한 변수
	const [userGrade, setUserGrade] = useState('');

	//로그인 회원의 grade 가져오기
	const adminCheck = () => {
		//로그인 했는지 체크
		console.log('userNum = ' + userNum);
		console.log('hostOK = ' + hostLoginOk);

		//member 로그인 정보가 있으면
		if (userNum != null) {
			let url = localStorage.url + '/adminCheck?userNum=' + userNum;

			//멤버 등급 가져오기
			axios.get(url).then((res) => {
				setUserGrade(res.data);

				//res.data -> ADMIN or USER
			});
		}
		console.log('유저등급 = ' + userGrade);
	};

	//로그인 멤버의 Grade 담기

	useEffect(() => {
		adminCheck();
	}, []);

	//내 공간 등록하기(호스트) 관련 메서드
	const hostCheck = () => {
		{
			sessionStorage.loginok == null
				? alert('호스트 회원으로 로그인하시기 바랍니다.')
				: navi('/host/slist');
		}
	};

	return (
		<HeaderWrapper>
			<InnerWrapper>
				<Home onClick={() => (window.location.href = '/')}>
					{/* <img alt='' src={mlogo} /> */}
					<b style={{fontFamily: 'Happiness-Sans-Title'}}>MoiM</b>
				</Home>
				<SearchBox>
					<SearchRounded onClick={handleClick} />
					<SearchInput
						type={'text'}
						placeholder={'지역, 공간유형, 공간명으로 찾아보세요'}
						ref={input} // ref에 input 값
						onKeyPress={handleOnKeyPress}
					/>
				</SearchBox>
				<RightWrapper>
					<NoticeLink>
						{userGrade != 'ADMIN' ? (
							// ADMIN이 아닐때
							<span
								onClick={() => navi('/notice')}
								style={{cursor: 'pointer', marginLeft: '80px'}}
							>
								공지사항
							</span>
						) : (
							// ADMIN일때
							<>
								<span
									onClick={() => navi('/admin')}
									style={{cursor: 'pointer'}}
								>
									관리자
								</span>
								&emsp;
								<span
									onClick={() => navi('/notice')}
									style={{cursor: 'pointer'}}
								>
									공지사항
								</span>
							</>
						)}
					</NoticeLink>
					&emsp;
					<HostLink onClick={hostCheck}>내 공간 등록하기</HostLink>
					<MyMenu />
				</RightWrapper>
			</InnerWrapper>
		</HeaderWrapper>
	);
}
export default Header;

const HeaderWrapper = styled.header`
	position: fixed;
	top: -1px;
	background-color: #fff;
	z-index: 999;
	height: 100px;
	width: 100%;
	display: flex;
	align-items: center;

	border-bottom: 0.5px solid lightgray;
`;
const InnerWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 auto;
	@media (max-width: 1920px) {
		width: 100%;
		max-width: 1400px;
	}
	@media (max-width: 1680px) {
		width: 100%;
		max-width: 1300px;
	}
	@media (max-width: 1000px) {
		width: 100%;
		max-width: 900px;
	}
	@media (max-width: 900px) {
		width: 100%;
		max-width: 800px;
	}
`;
const Home = styled.div`
	cursor: pointer;
	> img {
		width: 60px;
		height: 40px;
		margin-top: -20px;
	}
	> b {
		font-size: 40px;
	}
`;
const SearchInput = styled.input`
	background-color: #f1f1f1;
	border: none;
	outline: none;
	@media (max-width: 1920px) {
		width: 320px;
	}
	@media (max-width: 1680px) {
		width: 320px;
	}
	@media (max-width: 1000px) {
		width: 200px;
	}
	@media (max-width: 900px) {
		width: 200px;
	}
`;
const SearchBox = styled.div`
	margin-top: 10px;
	height: 50px;
	background-color: #f1f1f1;
	display: flex;
	justify-content: start;
	border-radius: 100px;
	@media (max-width: 1920px) {
		width: 500px;
	}
	@media (max-width: 1680px) {
		width: 500px;
	}
	@media (max-width: 1000px) {
		width: 300px;
	}
	@media (max-width: 900px) {
		width: 300px;
	}
	> svg {
		font-size: 40px;
		margin-top: 7px;
		margin-left: 10px;
		margin-right: 20px;
		cursor: pointer;
		color: gray;
	}
`;
const HostLink = styled.div`
	width: 150px;
	font-size: 18px;
	cursor: pointer;
`;

const NoticeLink = styled.div`
	width: 150px;
	font-size: 18px;
	color: gray;
`;

const RightWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;
