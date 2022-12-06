import React, {useRef, useState} from 'react';
import ReportList from './ReportList';
import {SearchRounded} from '@material-ui/icons';

function ReportManagement(props) {
	const input = useRef(null);
	const [reportList, setReportList] = useState('');

	//하위 List 컴포넌트에 전달 될 sort 와 searchWord
	const [sort, setSort] = useState('order by w.num desc');
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
		<div style={{width: '100%'}}>
			<div
				className='noticeSearch'
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
					className='searchContainer'
					style={{
						width: '90%',
						height: '60px',

						outline: 'none',
						border: 'none',
						// backgroundColor: 'rgba(240, 242, 245)',
						backgroundColor: 'white',
					}}
					placeholder='신고유형 또는 게스트 / 호스트 이메일을 입력해주세요'
					ref={input}
					onKeyPress={handleOnKeyPress}
				/>
			</div>

			<br />
			{/* 필터 / 조회된 게시글 수 */}
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<b style={{marginTop: '10px'}}>
					조회된 게시글 : {reportList.length}개
				</b>
				<select
					style={{
						width: '100px',
						height: '37px',
						borderRadius: '5px',
					}}
					value={sort}
					onChange={handleChange}
				>
					<option value={'order by w.num desc'}>최신순</option>
					<option value={'and w.status = "신고 접수"'}>
						신고 접수
					</option>
					<option value={'and w.status = "처리중"'}>처리중</option>
					<option value={'and w.status = "처리 완료"'}>
						처리 완료
					</option>
				</select>
			</div>

			<div style={{width: '100%'}}>
				{/* 신고 목록 */}
				<ReportList
					sort={sort}
					searchWord={searchWord}
					reportList={reportList}
					setReportList={setReportList}
				/>
			</div>
		</div>
	);
}

export default ReportManagement;
