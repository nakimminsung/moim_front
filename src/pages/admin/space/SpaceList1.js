import React, {useEffect, useState} from 'react';
import {Person} from '@material-ui/icons';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

//11.23 공간 승인 관련 추가 import (토글 스위치)
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';

function SpaceList1(props) {
	//상위로부터 받은 변수 선언 (props)
	const {sort, searchWord, setSearchWord} = props;
	const {spaceList, setSpaceList} = props;

	//공간 클릭 시 상세페이지로 이동되도록
	const navi = useNavigate();

	//방 정보 가져오기 axios 통신
	const getSpaceList = () => {
		let url =
			localStorage.url +
			'/admin/spaceList?searchWord=' +
			searchWord +
			'&sort=' +
			sort;

		console.log(searchWord);
		console.log(url);

		//front - back 통신구간 (axios)
		axios.get(url).then((res) => {
			setSpaceList(res.data);

			console.log(res.data);
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
			window.location.reload();
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
			window.location.reload();
		});
	};

	useEffect(() => {
		//방 리스트
		getSpaceList();
	}, [sort, searchWord]);

	//11.23 공간 승인 관련 추가 (토글 스위치)
	const AntSwitch = withStyles((theme) => ({
		root: {
			width: 28,
			height: 16,
			padding: 0,
			display: 'flex',
		},
		switchBase: {
			padding: 2,
			color: theme.palette.grey[500],
			'&$checked': {
				transform: 'translateX(12px)',
				color: theme.palette.common.white,
				'& + $track': {
					opacity: 1,
					backgroundColor: theme.palette.primary.main,
					borderColor: theme.palette.primary.main,
				},
			},
		},
		thumb: {
			width: 12,
			height: 12,
			boxShadow: 'none',
		},
		track: {
			border: `1px solid ${theme.palette.grey[500]}`,
			borderRadius: 16 / 2,
			opacity: 1,
			backgroundColor: theme.palette.common.white,
		},
		checked: {},
	}))(Switch);

	const handleChange = (event) => {
		setState({...state, [event.target.name]: event.target.checked});
	};

	const [state, setState] = React.useState({
		// checkedA: true,
		// checkedB: true,
		checkedC: true,
	});

	return (
		// 출력 영역 전체 div1
		<div
			className='spaceList'
			style={{
				width: '100%',
			}}
		>
			{/* 출력 영역 전체 div2 */}
			<div
				style={{
					marginTop: '10px',
					width: '100%',
					display: 'flex',
					justifyContent: 'flex-start',
					flexWrap: 'wrap',
				}}
			>
				{spaceList &&
					spaceList.map((data, idx) => (
						//반복해서 출력하는 div 카드
						<div
							style={{
								border: '1px solid lightgray',
								borderRadius: '5px',
								// width: '300px',
								// marginRight: '2%',
								// cursor: 'pointer',

								marginBottom: '30px',
								backgroundColor: 'white',
								boxShadow: '0px 2px 2px 1px rgba(0 0 0 / 10%)',

								width: '23%',
								// height: '100%',
								margin: '1%',
							}}
							key={idx}
						>
							{/* 카드에서 방 정보 */}
							<div>
								{/* 방 정보 > 방 이미지 출력 */}
								<div className='roomImage'>
									{data.approvalStatus == 0 ? (
										<>
											<div
												style={{
													position: 'relative',
													width: '100%',
												}}
											>
												<img
													alt=''
													src={data.thumbnailImage}
													style={{
														width: '100%',
														height: '200px',
														// height: '70%',
														borderRadius: '5px',

														opacity: '0.4',
													}}
												/>
												<span
													style={{
														width: '100%',
														fontSize: '24px',
														fontWeight: 'bold',
														color: 'gray',
														position: 'absolute',
														zIndex: '1',
														top: '80px',
														left: '32%',
													}}
												>
													승인 대기
												</span>
											</div>
										</>
									) : (
										<>
											<div>
												<img
													alt=''
													src={data.thumbnailImage}
													style={{
														width: '100%',
														height: '200px',
														// height: '70%',
														borderRadius: '5px',
													}}
												/>
											</div>
										</>
									)}
								</div>

								{/* 방 정보 > 글자 출력 */}
								<div
									style={{color: 'gray', textAlign: 'center'}}
								>
									<h5>
										<b style={{color: 'black'}}>
											{/* 방 이름 줄이기 */}
											{data.name.length > 11
												? data.name.substr(0, 12) +
												  '...'
												: data.name}
										</b>
									</h5>
									<p>{data.companyName}</p>
								</div>
								{/* 카드 > 방 정보 > 글자 출력 종료 */}
							</div>
							{/* 카드 > 방 정보 출력 종료 */}

							{/* 11/23 신규 추가 영역 */}
							{/* 상세보기 / 공간 승인 / 공개여부 */}
							<div style={{textAlign: 'center'}}>
								<button
									type='button'
									className='btn btn-secondary'
									onClick={() => {
										navi('/detail/' + data.num);
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
							</div>
							<br />

							{/* 공개 / 비공개 토글 스위치 영역 */}
							{/* <div
								style={{
									display: 'flex',
									justifyContent: 'center',
									marginBottom: '10px',
									marginTop: '10px',
								}}
							>
								<FormGroup>
									<Typography component='div'>
										<Grid
											component='label'
											container
											alignItems='center'
											spacing={1}
											style={{fontSize: '1.1em'}}
										>
											<Grid item>비공개</Grid>
											<Grid item>
												<AntSwitch
													checked={state.checkedC}
													onChange={handleChange}
													name='checkedC'
												/>
											</Grid>
											<Grid item>공개</Grid>
										</Grid>
									</Typography>
								</FormGroup>
							</div> */}
						</div>
					))}
			</div>
		</div>
	);
}

export default SpaceList1;
