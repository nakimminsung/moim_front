import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchRounded } from '@material-ui/icons';
import mlogo from '../../asset/logo/m_logo.png';
import MyMenu from '../components/MyMenu';
import styled from 'styled-components';

function Header(props) {
	//useState 가 아닌 버튼 클릭 시 searchWord에 저장되도록 Ref 사용
	const input = useRef(null);
	const navi = useNavigate();
	const [searchWord, setSearchWord] = useState('');

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

	return (
		<HeaderWrapper>
			<InnerWrapper>
				<Home onClick={() => navi('/')}>
					<img alt='' src={mlogo} />
					<b>MoiM</b>
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
					<HostLink onClick={() => navi('/')}>
						내 공간 등록하기
					</HostLink>
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
const RightWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;
