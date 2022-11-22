import {SearchRounded} from '@material-ui/icons';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewListIcon from '@material-ui/icons/ViewList';

import React, {useEffect, useRef, useState} from 'react';

import SpaceList1 from './SpaceList1';
import SpaceList2 from './SpaceList2';

function SpaceManagement(props) {
	//useState 가 아닌 버튼 클릭 시 searchWord에 저장되도록 Ref 사용
	const input = useRef(null);

	//공간 목록 선언 (하위에서 사용될 변수)
	const [spaceList, setSpaceList] = useState('');

	//최초 보여지는 테마 = 1번
	const [show, setShow] = useState(1);

	//하위 List 컴포넌트에 전달 될 sort 와 searchWord
	const [sort, setSort] = useState('and approvalStatus=1');
	const [searchWord, setSearchWord] = useState('');

	//Select Option 에 따른 값 변경 (set Sort)
	const handleChange = (e) => {
		console.log(e.target.value);
		setSort(e.target.value);
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
		setSearchWord(input.current.value);
	};

	return (
		<div>
			<div
				className='spaceSearch'
				style={{
					width: '100%',
					// border: '1px solid gray',
					border: 'none',
					borderRadius: '10px',
					backgroundColor: 'white',
					boxShadow: '0px 2px 2px 1px rgba(0 0 0 / 10%)',
				}}
			>
				<SearchRounded
					style={{
						fontSize: '30px',
						marginBottom: '-5px',
						marginLeft: '10px',
						marginRight: '20px',
						cursor: 'pointer',
						color: 'gray',
					}}
					onClick={handleClick}
				/>
				<input
					type={'text'}
					className='seacrhContainer'
					style={{
						width: '90%',
						height: '60px',

						outline: 'none',
						border: 'none',
						// backgroundColor: 'rgba(240, 242, 245)',
						backgroundColor: 'white',
					}}
					placeholder='공간 이름 혹은 호스트명을 입력해주세요'
					ref={input}
					// value={searchWord}
					// onChange={(e) => {
					// setSearchWord(e.target.value);
					// }}
					onKeyPress={handleOnKeyPress}
				/>
			</div>

			<br />

			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				{/* 검색 여부에 따른 삼항 연산자 */}
				<div style={{marginLeft: '10px', paddingTop: '5px'}}>
					{searchWord !== '' ? (
						//검색단어 있으면서, 결과가 있을때
						spaceList.length !== 0 ? (
							<b>
								{{searchWord}.searchWord} (으)로 검색된 공간 :{' '}
								{spaceList.length} 개
							</b>
						) : (
							//검색단어 있으면서, 결과가 없을때
							<b>검색된 '공간'이 없습니다.</b>
						)
					) : //삼항 연산자 중첩 시작
					//검색단어 없으면서, 결과가 있을때
					spaceList.length !== 0 ? (
						<b>조회된 공간 : {spaceList.length} 개</b>
					) : (
						//검색단어 없으면서, 결과가 없을때
						<b>등록된 '공간'이 없습니다.</b>
					)}
				</div>

				{/* 리스트 컴포넌트 선택 */}
				<div>
					<DashboardIcon
						style={{
							fontSize: '1.5em',
							color: show === 1 ? 'black' : '#a0a0a0',
							cursor: 'pointer',
						}}
						onClick={() => {
							setShow(1);
						}}
					/>
					&nbsp;
					<ViewListIcon
						style={{
							fontSize: '2em',
							color: show === 2 ? 'black' : '#a0a0a0',
							cursor: 'pointer',
							marginBottom: '-3.5px',
						}}
						onClick={() => {
							setShow(2);
						}}
					/>
					&emsp;
					<select
						style={{
							width: '100px',
							height: '30px',
							borderRadius: '5px',
						}}
						value={sort}
						onChange={handleChange}
					>
						<option value={'and approvalStatus=1'}>
							승인 완료
						</option>
						<option value={'and approvalStatus=0'}>
							승인 대기
						</option>
						<option value={'order by r.num desc'}>최신순</option>
						<option value={'order by readCount desc'}>
							인기순
						</option>
					</select>
				</div>
			</div>

			{/* 리스트 컴포넌트 호출 */}
			<div>
				{show === 1 ? (
					<SpaceList1
						sort={sort}
						setSort={setSort}
						searchWord={searchWord}
						spaceList={spaceList}
						setSpaceList={setSpaceList}
					/>
				) : (
					<SpaceList2
						sort={sort}
						setSort={setSort}
						searchWord={searchWord}
						spaceList={spaceList}
						setSpaceList={setSpaceList}
					/>
				)}
			</div>
		</div>
	);
}

export default SpaceManagement;
