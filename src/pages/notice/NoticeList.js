import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

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

	return (
		<div style={{width: '100%', borderTop: '2px solid gray'}}>
			<div className='noticeListDiv'>
				{noticeList &&
					noticeList.map((data, idx) => (
						<>
							<Accordion
								expanded={expanded === idx} //펼치기
								onChange={handleChange(idx)} //닫기
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
									<Typography sx={{color: 'text.secondary'}}>
										<b>{data.title}</b>
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									{/* <Typography> */}
									<pre
										style={{
											textAlign: 'center',
											height: 'auto',
										}}
									>
										{/* 사진이 있을때만 출력 */}
										{data.imageUrl !== null ? (
											// src DB가 https 로 시작할때
											data.imageUrl.startsWith('http') ? (
												<img
													alt=''
													src={data.imageUrl}
													style={{
														width: '40%',
														maxheight: '300px',
														marginBottom: '50px',
													}}
												/>
											) : (
												// src DB가 파일명 일떄
												<img
													alt=''
													src={imgUrl + data.imageUrl}
													style={{
														width: '40%',
														maxheight: '300px',
														marginBottom: '50px',
													}}
												/>
											)
										) : (
											//사진이 없을때 공란
											''
										)}
										<br />
										{data.content}
									</pre>
									{/* </Typography> */}
									{/* PRE 태그가 안먹힘 */}
								</AccordionDetails>
							</Accordion>
						</>
					))}
			</div>
		</div>
	);
}

export default NoticeList;
