import {SearchRounded} from '@material-ui/icons';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewListIcon from '@material-ui/icons/ViewList';

import React, {useRef, useState} from 'react';

import SpaceList1 from './SpaceList1';
import SpaceList2 from './SpaceList2';

function SpaceManagement(props) {
	// 검색 버튼클릭 시 searchWord에 저장되도록 Ref 사용
	const input = useRef(null);

	// 최초에 전체 갯수에 대한 문구 지정
	const [defaultCount, setDefaultCount] = useState('총 갯수는 ');

	// 검색 결과 갯수에 대한 문구 지정 (비워두기)
	const [searchCount, setSearchCount] = useState('');

	//공간 목록 선언 (자식 컴포넌트에 props 로 넘김)
	const [spaceList, setSpaceList] = useState('');

	//최초 보여지는 테마 = 1번
	const [show, setShow] = useState(1);

	//하위 컴포넌트 (SpaceList1 , SpaceList2) 에 props 로 'searchWord', 'sort' 값 전달하기
	const [sort, setSort] = useState('');
	const [searchWord, setSearchWord] = useState('');

	//Select Option 에 따른 값 변경 (set Sort)
	const handleChange = (e) => {
		console.log(e.target.value);
		setSort(e.target.value);
	};

	//돋보기(검색) 버튼 클릭 시 이벤트
	const handleClick = (e) => {
		//searchWord에 입력값 저장
		setSearchWord(input.current.value);

		// '총 갯수는 ' 문구 제거
		setDefaultCount('');
		setSearchCount(
			'"' + {searchWord}.searchWord + '" (으)로 검색된 공간 : ',
		);

		console.log('managenent console = ' + {searchWord}.searchWord);
	};

	//input text 에 엔터키 적용시키기
	const handleOnKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleClick(); // Enter 입력이 되면 클릭 이벤트 실행
		}
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
					// 	// setSearchWord(e.target.value);
					// }}
					onKeyPress={handleOnKeyPress}
				/>
			</div>

			<br />

			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				{/* count 갯수 + 필터 */}
				<div style={{marginLeft: '10px', paddingTop: '5px'}}>
					{spaceList.length !== 0 ? (
						<b>
							{defaultCount}
							{searchCount}
							{spaceList.length} 개
						</b>
					) : (
						<b>검색된 상품이 없습니다.</b>
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
						defaultValue={'and approvalStatus=1'}
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
