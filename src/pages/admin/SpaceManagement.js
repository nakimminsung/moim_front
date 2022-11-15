import {SearchRounded} from '@material-ui/icons';
import SubjectIcon from '@material-ui/icons/Subject';
import DashboardIcon from '@material-ui/icons/Dashboard';

import React, {useEffect, useState} from 'react';

import SpaceList1 from './SpaceList1';

function SpaceManagement(props) {
	const [sort, setSort] = useState('');

	const handleSelect = (e) => {
		console.log(e.target.value);
	};

	useEffect(() => {
		//sort값 디폴트 설정
		setSort('where hideStatus=0');
		console.log(sort);
	}, [sort]);

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
				/>
			</div>
			{/* 리스트 컴포넌트 선택 */}
			<br />
			<div style={{float: 'right', marginBottom: '10px'}}>
				<DashboardIcon style={{color: 'gray', cursor: 'pointer'}} />
				&nbsp;
				<SubjectIcon style={{color: 'gray', cursor: 'pointer'}} />
				&emsp;
				<select style={{width: '100px'}} onChange={handleSelect}>
					<option value={'where hideStatus=0'}>승인 대기</option>
					<option value={'where hideStatus=1'}>승인 완료</option>
					<option value={'order by readCount desc'}>인기순</option>
					<option value={'order by num desc'}>최신순</option>
				</select>
			</div>

			{/* 리스트 컴포넌트 호출 */}
			<div>
				<SpaceList1 />
			</div>
		</div>
	);
}

export default SpaceManagement;
