import {SearchRounded} from '@material-ui/icons';
import React, {useRef, useState} from 'react';
import NoticeList from './NoticeList';

function Notice(props) {
	//검색을 위한 변수 선언
	const input = useRef(null);
	const [searchWord, setSearchWord] = useState('');
	const [noticeList, setNoticeList] = useState('');

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
		<div className='allDiv'>
			{/* 공지사항 헤더 */}
			<div
				className='noticeHeader'
				style={{textAlign: 'center', marginTop: '-40px'}}
			>
				<h2>
					<b>공지사항</b>
				</h2>
				<br />
				<br />
				<div
					className='noticeSearch'
					style={{
						width: '100%',
						height: '150px',
						border: '4px solid #704de4',
						padding: '30px',
						textAlign: 'start',
					}}
				>
					<p>
						<b style={{fontSize: '16px'}}>공지사항 검색</b>
					</p>
					<div
						style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<input
							type={'text'}
							className='form-control'
							placeholder='제목 또는 내용으로 검색해주세요.'
							style={{width: '85%', borderRadius: '10px'}}
							ref={input}
							onKeyPress={handleOnKeyPress}
						/>
						<button
							type='button'
							style={{
								width: '140px',
								height: '50px',
								backgroundColor: '#704de4',
								// backgroundColor: '#9986b3',
								color: 'white',
								border: 'none',
								borderRadius: '10px',
							}}
							onClick={handleClick}
						>
							<span>
								<SearchRounded
									style={{
										fontSize: '2em',
										marginBottom: '-5px',
									}}
								/>
								<b style={{fontSize: '1.3em'}}>검색</b>
							</span>
						</button>
					</div>
				</div>
				{/* notice Search 종료 */}
			</div>
			{/* noticeHeader 종료 */}

			<br />
			<br />
			<div className='noticeContent' style={{width: '100%'}}>
				<NoticeList
					searchWord={searchWord}
					setSearchWord={setSearchWord}
					noticeList={noticeList}
					setNoticeList={setNoticeList}
				/>
			</div>
		</div>
	);
}

export default Notice;
