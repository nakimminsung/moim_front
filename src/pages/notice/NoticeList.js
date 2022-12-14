import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

import Pagination from 'react-js-pagination';

function NoticeList(props) {
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	//리스트를 가져오기위한 변수 선언 - useState
	const {noticeList, setNoticeList, searchWord, setSearchWord} = props;

	//공지사항 리스트를 가져오는 함수
	const getNoticeList = () => {
		//BackEnd에 전달 할 url 지정 (getMapping)
		let url =
			localStorage.url + '/notice/noticeList?searchWord=' + searchWord;

		console.log(url); //url 정상 확인

		//axios : BackEnd 단에 getMapping url 호출
		axios.get(url).then((res) => {
			//성공하면 가져온 List data를 NoticeList에 Set 하기
			setNoticeList(res.data);
		});
	};

	//DB에 이미지 가져오기
	const imgUrl = 'http://localhost:9000/image/';

	React.useEffect(() => {
		getNoticeList();
	}, [searchWord]);

	//페이징 처리 - pagenation
	const [page, setPage] = React.useState(1);

	//한번에 보여질 아이템 수
	let items = 10;

	//페이지 변경 이벤트
	const handlePageChange = (page) => {
		setPage(page);
	};

	return (
		<div style={{width: '100%', borderTop: '2px solid lightgray'}}>
			<div className='noticeListDiv'>
				{/* 1. 검색 결과가 있을때 */}
				{noticeList.length != 0 ? (
					(
						noticeList &&
						noticeList.map((data, idx) => (
							<>
								<Accordion
									expanded={expanded === idx} //펼치기
									onChange={handleChange(idx)} //닫기
									style={{
										backgroundColor:
											//짝수일때
											idx % 2 === 0 ? '#f5f5f5' : 'white',
									}}
								>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls='panel3bh-content'
										id='panel3bh-header'
									>
										<Typography
											sx={{width: '20%', flexShrink: 0}}
										>
											<b>{data.type}</b>
										</Typography>
										<Typography
											sx={{color: 'text.secondary'}}
										>
											{/* 공지사항 제목 : notice title */}
											<b>{data.title}</b>
										</Typography>
									</AccordionSummary>
									<AccordionDetails>
										{/* <Typography> */}
										{/* 공지사항 작성일자 : notice writeday */}
										<span
											style={{
												color: 'gray',
												float: 'right',
											}}
										>
											작성일시 : {data.writeday}
										</span>
										<br />
										{/* 사진이 있을때만 출력 */}
										<div style={{textAlign: 'center'}}>
											{data.imageUrl !== null ? (
												// src DB가 https 로 시작할때
												data.imageUrl.startsWith(
													'http',
												) ? (
													<img
														alt=''
														src={data.imageUrl}
														style={{
															width: '40%',
															maxheight: '300px',
															marginBottom:
																'50px',
														}}
													/>
												) : (
													// src DB가 파일명 일떄
													<img
														alt=''
														src={
															imgUrl +
															data.imageUrl
														}
														style={{
															width: '40%',
															maxheight: '300px',
															marginBottom:
																'50px',
														}}
													/>
												)
											) : (
												//사진이 없을때 공란
												''
											)}
										</div>
										<br />
										<pre
											style={{
												textAlign: '',
												height: 'auto',
												paddingLeft: '20%',
												paddingRight: '20%',
												fontFamily: 'NanumSquareRound',
												// fontFamily:
												// 	'Roboto,Helvetica,Arial,sans-serif',
											}}
										>
											{data.content}
										</pre>
										{/* </Typography> */}
										{/* PRE 태그가 안먹힘 */}
									</AccordionDetails>
								</Accordion>
							</>
						))
					).slice(items * (page - 1), items * (page - 1) + items)
				) : (
					// 2. 검색 결과가 없을때
					<>
						<div
							style={{
								textAlign: 'center',
								marginTop: '50px',
								paddingBottom: '50px',
								borderBottom: '2px solid lightgray',
							}}
						>
							<h4>
								<b>검색된 공지사항이 없습니다.</b>
							</h4>
						</div>
					</>
				)}
			</div>
			<br />
			{/* 페이지네이션 여부 */}
			{/* 페이지네이션 생기는 위치 */}
			<div className='pageDiv'>
				<Pagination
					activePage={page} // 현재 보고있는 페이지
					itemsCountPerPage={10} // 한 페이지에 출력할 아이템 수
					totalItemsCount={noticeList.length} // 총 아이템 수
					pageRangeDisplayed={5} // 표시할 아이템 수
					prevPageText={'‹'}
					nextPageText={'›'}
					onChange={handlePageChange}
				/>
			</div>
		</div>
	);
}

export default NoticeList;
