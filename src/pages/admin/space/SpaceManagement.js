import {SearchRounded} from '@material-ui/icons';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewListIcon from '@material-ui/icons/ViewList';

import React, {useEffect, useRef, useState} from 'react';

import SpaceList1 from './SpaceList1';

import SpaceList2 from './SpaceList2';

function SpaceManagement(props) {
	//최초 보여지는 테마 = 1번
	const [show, setShow] = useState(1);

	//하위 컴포넌트 (SpaceList1 , SpaceList2) 에 props 로 'searchWord', 'sort' 값 전달하기
	// const {sort, setSort, searchWord} = props;
	const [sort, setSort] = useState('');
	const [searchWord, setSearchWord] = useState('');

	//Select Option 에 따른 값 변경 (set Sort)
	const handleChange = (e) => {
		setSort(e.target.value);
	};

	//돋보기(검색) 버튼 클릭 시 이벤트
	const handleClick = (e) => {
		console.log(e.target.value);
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
					value={searchWord}
					onChange={(e) => {
						// setSearchWord(e.target.value);
					}}
				/>
			</div>
			{/* 리스트 컴포넌트 선택 */}
			<br />
			<div style={{float: 'right', marginBottom: '10px'}}>
				<DashboardIcon
					style={{
						fontSize: '1.5em',
						color: show === 1 ? 'black' : 'gray',
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
						color: show === 2 ? 'black' : 'gray',
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
					onChange={handleChange}
				>
					<option value={'and approvalStatus=1'}>승인 완료</option>
					<option value={'and approvalStatus=0'}>승인 대기</option>
					<option value={'order by r.num desc'}>최신순</option>
					<option value={'order by readCount desc'}>인기순</option>
				</select>
			</div>

			{/* 리스트 컴포넌트 호출 */}
			<div>{show === 1 ? <SpaceList1 /> : <SpaceList2 />}</div>
		</div>
	);
}

export default SpaceManagement;
