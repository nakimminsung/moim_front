import {SearchRounded} from '@material-ui/icons';
import React, {useRef, useState} from 'react';
import HostList from './HostList';

function HostManagement(props) {
	//useState 가 아닌 버튼 클릭 시 searchWord에 저장되도록 Ref 사용
	const input = useRef(null);

	//호스트 목록 선언 (하위에서 사용될 변수)
	const [hostList, setHostList] = useState('');

	//하위 List 컴포넌트에 전달 될 sort 와 searchWord
	const [sort, setSort] = useState('order by idx desc');
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
			{/* 검색 */}
			<div
				className='hostSearch'
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
				/>
				<input
					type={'text'}
					className='searchContainer'
					style={{
						width: '90%',
						height: '60px',

						outline: 'none',
						border: 'none',
						// backgroundColor: 'rgba(240, 242, 245)',
						backgroundColor: 'white',
					}}
					placeholder='호스트의 이름 또는 이메일을 입력해주세요'
					ref={input}
					onKeyPress={handleOnKeyPress}
				/>
			</div>

			<br />

			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				{/* 검색 여부에 따른 삼항 연산자 */}
				<div style={{marginLeft: '10px', paddingTop: '5px'}}>
					{searchWord !== '' ? (
						//검색단어 있으면서, 결과가 있을때
						hostList.length !== 0 ? (
							<b>
								"{{searchWord}.searchWord}" (으)로 검색된 회원 :{' '}
								{hostList.length} 개
							</b>
						) : (
							//검색단어 있으면서, 결과가 없을때
							<b>검색된 회원이 없습니다.</b>
						)
					) : //삼항 연산자 중첩 시작
					//검색단어 없으면서, 결과가 있을때
					hostList.length !== 0 ? (
						<b>조회된 회원 : {hostList.length} 명</b>
					) : (
						//검색단어 없으면서, 결과가 없을때
						<b>등록된 회원이 없습니다.</b>
					)}
				</div>
				<div>
					<select
						style={{
							width: '100px',
							height: '30px',
							borderRadius: '5px',
						}}
						value={sort}
						onChange={handleChange}
					>
						<option value={'order by idx desc'}>최신순</option>
						<option value={'and status = 0'}>활성 회원</option>
						<option value={'and status = 1'}>정지 회원</option>
					</select>
				</div>
			</div>

			{/* 호스트 리스트 출력 컴포넌트 */}
			<div>
				<HostList
					sort={sort}
					setSort={setSort}
					searchWord={searchWord}
					hostList={hostList}
					setHostList={setHostList}
				/>
			</div>
		</div>
	);
}

export default HostManagement;
