import {SearchRounded} from '@material-ui/icons';
import React, {useRef, useState} from 'react';
import NoticeListAdmin from './NoticeListAdmin';

function NoticeManagement(props) {
	const input = useRef(null);
	const [noticeList, setNoticeList] = useState('');
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
		setSearchWord(input.current.value);
	};
	return (
		<div>
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
					placeholder='공지사항 / 이벤트의 제목을 입력해주세요'
					ref={input}
					onKeyPress={handleOnKeyPress}
				/>
			</div>

			<br />
			{/* 검색 여부에 따른 삼항 연산자 */}
			<div style={{marginLeft: '10px', paddingTop: '5px'}}>
				{searchWord !== '' ? (
					//검색단어 있으면서, 결과가 있을때
					noticeList.length !== 0 ? (
						<b>
							'{{searchWord}.searchWord}' (으)로 검색된 게시글 :{' '}
							{noticeList.length} 개
						</b>
					) : (
						//검색단어 있으면서, 결과가 없을때
						<b>
							'{{searchWord}.searchWord}' (으)로 검색된 게시글이
							없습니다.
						</b>
					)
				) : //삼항 연산자 중첩 시작
				//검색단어 없으면서, 결과가 있을때
				noticeList.length !== 0 ? (
					<b>조회된 게시글 : {noticeList.length} 개</b>
				) : (
					//검색단어 없으면서, 결과가 없을때
					<b>등록된 게시글이 없습니다.</b>
				)}
			</div>
			<NoticeListAdmin
				noticeList={noticeList}
				setNoticeList={setNoticeList}
				searchWord={searchWord}
			/>
		</div>
	);
}

export default NoticeManagement;
