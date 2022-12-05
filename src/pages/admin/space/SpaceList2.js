import React, {useEffect, useState} from 'react';
import {Person} from '@material-ui/icons';
import axios from 'axios';
import RoomIcon from '@material-ui/icons/Room';
import {useNavigate} from 'react-router-dom';
import Pagination from 'react-js-pagination';

function SpaceList2(props) {
	//DB에서 이미지 가져오기(톰캣)
	const imgUrl = 'http://localhost:9000/image/';

	const {sort, searchWord, setSearchWord} = props;
	const {spaceList, setSpaceList} = props;

	const navi = useNavigate(); //공간 클릭 시 상세페이지로 이동

	const getSpaceList = () => {
		let url =
			localStorage.url +
			'/admin/spaceList?searchWord=' +
			searchWord +
			'&sort=' +
			sort;

		console.log(searchWord);
		console.log(url);

		axios.get(url).then((res) => {
			setSpaceList(res.data);
		});
	};

	//공간 승인/거부를 위한 방 번호 변수 선언
	var roomNum = '';

	//공간 승인 axios 통신
	const approveSpace = () => {
		// BackEnd 와 통신하기위한 url 지정
		// 특정 방에대한 정보(승인여부 : approvalStatus)만 update하면 되므로 Num 만 넘김
		let url = localStorage.url + '/admin/approveSpace?roomNum=' + roomNum;

		// front - back 통신구간 (axios)
		axios.get(url).then((res) => {
			// 성공했을 때 alert 처리
			alert('승인 처리되었습니다.');

			// reload
			// window.location.reload();
			getSpaceList();
		});
	};

	//공간 거부 axios 통신
	const rejectSpace = () => {
		// BackEnd 와 통신하기위한 url 지정
		// 특정 방에대한 정보(승인여부 : approvalStatus)만 update하면 되므로 Num 만 넘김
		let url = localStorage.url + '/admin/rejectSpace?roomNum=' + roomNum;

		// front - back 통신구간 (axios)
		axios.get(url).then((res) => {
			// 성공했을 때 alert 처리
			alert('승인 거부되었습니다.');

			// reload
			// window.location.reload();
			getSpaceList();
		});
	};

	useEffect(() => {
		//방 리스트
		getSpaceList();
	}, [sort, searchWord]);

	//페이징 처리 - pagenation
	const [page, setPage] = useState(1);

	//한번에 보여질 아이템 수
	let items = 8;

	//페이지 변경 이벤트
	const handlePageChange = (page) => {
		setPage(page);
	};

	return (
		<div>
			<div
				className='spaceList'
				style={{
					marginTop: '20px',
					width: '100%',
					display: 'flex',

					justifyContent: 'space-between',
					flexWrap: 'wrap',
				}}
			>
				{spaceList &&
					spaceList
						.slice(items * (page - 1), items * (page - 1) + items)
						.map((data, idx) => (
							<div
								style={{
									border: '1px solid lightgray',
									borderRadius: '5px',
									width: '49%',
									// cursor: 'pointer',

									marginBottom: '15px',
									backgroundColor: 'white',
									boxShadow:
										'0px 2px 2px 1px rgba(0 0 0 / 10%)',

									display: 'flex',
									padding: '10px 10px 10px',

									position: 'relative',
								}}
								key={idx}
								// onClick={() => {
								// 	navi('/detail/' + data.num);
								// }}
							>
								{/* 방 이미지 */}
								<div
									className='roomImage'
									style={{width: '35%'}}
								>
									{data.approvalStatus == 0 ? (
										<>
											<div
												style={{
													position: 'relative',
													width: '100%',
												}}
											>
												{data.thumbnailImage.startsWith(
													'http',
												) ? (
													<img
														alt=''
														src={
															data.thumbnailImage
														}
														style={{
															width: '100%',
															height: '200px',
															// height: '70%',
															borderRadius: '5px',

															opacity: '0.4',
														}}
													/>
												) : (
													// src DB가 파일명 일떄
													<img
														alt=''
														src={
															imgUrl +
															data.thumbnailImage
														}
														style={{
															width: '100%',
															height: '200px',
															// height: '70%',
															borderRadius: '5px',

															opacity: '0.4',
														}}
													/>
												)}

												<span
													style={{
														width: '100%',
														fontSize: '24px',
														fontWeight: 'bold',
														color: 'gray',
														position: 'absolute',
														zIndex: '1',
														// left: '0px',
														top: '80px',
														left: '25%',
													}}
												>
													승인 대기
												</span>
											</div>
										</>
									) : (
										<>
											<div
												style={{
													position: 'relative',
													width: '100%',
												}}
											>
												{data.thumbnailImage.startsWith(
													'http',
												) ? (
													<img
														alt=''
														src={
															data.thumbnailImage
														}
														style={{
															width: '100%',
															height: '200px',
															// height: '70%',
															borderRadius: '5px',
														}}
													/>
												) : (
													// src DB가 파일명 일떄
													<img
														alt=''
														src={
															imgUrl +
															data.thumbnailImage
														}
														style={{
															width: '100%',
															height: '200px',
															// height: '70%',
															borderRadius: '5px',
														}}
													/>
												)}
											</div>
										</>
									)}
								</div>

								{/* 방 정보 */}
								<div
									style={{color: 'gray', marginLeft: '10px'}}
								>
									<h5>
										<b style={{color: 'black'}}>
											{data.name}
										</b>
									</h5>
									<br />
									<span>{data.companyName}</span>
									<br />
									<span>
										<b
											style={{
												color: '#6f42c1',
												fontSize: '20px',
											}}
										>
											{data.weekAmPrice.toLocaleString(
												'ko-KR',
											)}
										</b>
										&nbsp;원/시간
									</span>
									<br />
									<span>
										<Person style={{fontSize: '20px'}} />{' '}
										최대 {data.headcount}인{' '}
									</span>
									&emsp;
									<span>
										<RoomIcon
											style={{
												fontSize: '20px',
												// marginBottom: '5px',
											}}
										/>
										{data.address.split(' ')[1]}
									</span>
									<br />
									<br />
									{/* 11/23 신규 추가 영역 */}
									{/* 상세보기 / 공간 승인 / 공개여부 */}
									<button
										type='button'
										className='btn btn-secondary'
										onClick={() => {
											// navi('/detail/' + data.num);
											window.open(
												'/detail/' + data.num,
												'_blank',
											);
										}}
									>
										상세 보기
									</button>
									{/* 승인 상태에 따른 삼항 연산자 (승인 버튼 노출) */}
									{data.approvalStatus == 0 ? (
										<>
											{/* 삼항연산자 조건에서 태그 하나만 올 수 있는데 &nbsp까지 2개이므로 하나로 인식하게끔 <> </>로 가둬줘야됨 */}
											&nbsp;
											<button
												type='button'
												className='btn btn-success'
												value={data.num}
												onClick={(e) => {
													roomNum = e.target.value;

													approveSpace();
												}}
											>
												공간 승인
											</button>
										</>
									) : (
										<>
											{/* 삼항연산자 조건에서 태그 하나만 올 수 있는데 &nbsp까지 2개이므로 하나로 인식하게끔 <> </>로 가둬줘야됨 */}
											&nbsp;
											<button
												type='button'
												className='btn btn-danger'
												value={data.num}
												onClick={(e) => {
													roomNum = e.target.value;

													rejectSpace();
												}}
											>
												공간 거부
											</button>
										</>
									)}
									<br />
								</div>
							</div>
						))}
			</div>
			{/* 페이지네이션 생기는 위치 */}
			<div className='pageDiv'>
				<Pagination
					activePage={page} // 현재 보고있는 페이지
					itemsCountPerPage={8} // 한 페이지에 출력할 아이템 수
					totalItemsCount={spaceList.length} // 총 아이템 수
					pageRangeDisplayed={5} // 표시할 아이템 수
					prevPageText={'‹'}
					nextPageText={'›'}
					onChange={handlePageChange}
				/>
			</div>
		</div>
	);
}

export default SpaceList2;
