import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Pagenation from './DetailPaging';
import Rating from '@material-ui/lab/Rating';
import {FormControlLabel, Switch} from '@material-ui/core';
import DetailHost from './DetailHost';
import DetailSm from './DetailSm';

function DetailReview(props) {
	const {num} = useParams();
	const [reviewCount, setReviewCount] = useState(0);
	const [reviewAvg, setReviewAvg] = useState(0);
	const [review, setReview] = useState([]);
	const [checked, setChecked] = useState(false);
	const [photoList, setPhotoList] = useState([]);
	const [totalList, setTotalList] = useState([]);

	const imgUrl = 'http://localhost:9000/image/';

	//페이징처리
	const [limit, setLimit] = useState(3);
	const [page, setPage] = useState(1);
	const offset = (page - 1) * limit;

	//Qna데이터 가져오기
	const onSelectData = () => {
		let url = localStorage.url + '/detailReview?num=' + num;

		axios.get(url).then((res) => {
			setReviewCount(res.data.count);
			setReviewAvg(res.data.avg);
			setReview(res.data.review);
			setPhotoList(res.data.reviewPhoto);
			setTotalList(res.data.review);
		});
	};

	//사진 후기
	const toggleChecked = () => {
		setChecked((prev) => !prev);
		//console.log(checked);

		if (checked) {
			setReview(totalList);
		} else {
			setReview(photoList);
		}
	};

	useEffect(() => {
		onSelectData(num);
	}, []);

	return (
		<div>
			<div id='6' style={{marginTop: '100px'}}>
				<div>
					<b
						style={{
							borderBottom: '2px solid #ffd014',
							fontSize: '18px',
							paddingBottom: '5px',
						}}
					>
						이용후기{' '}
						<b style={{color: 'rgb(112, 77, 228)'}}>
							({reviewCount}개)
						</b>{' '}
						{/* 평균평점 {reviewAvg}점 */}
					</b>
					<span style={{float: 'right'}}>
						<FormControlLabel
							control={
								<Switch
									style={{color: '#704de4'}}
									checked={checked}
									onChange={toggleChecked}
								/>
							}
							label='사진 후기만 보기'
							labelPlacement='start'
							style={{color: 'light gray'}}
						/>
					</span>
				</div>

				{/* Review 리스트 출력 */}
				{review.length == 0 ? (
					<div
						style={{
							textAlign: 'center',
							marginTop: '120px',
							height: '150px',
						}}
					>
						<h3>등록된 리뷰가 없습니다.</h3>
					</div>
				) : (
					<div>
						<table className='table' style={{marginTop: '30px'}}>
							<tbody>
								{review &&
									review
										.slice(offset, offset + limit)
										.map((item, idx) => (
											<tr key={idx}>
												<td
													style={{
														width: '130px',
													}}
												>
													<img
														alt=''
														src={
															item.profile_image ==
															null
																? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
																: item.profile_image
														}
														className='qnaImg'
													/>
												</td>
												<td
													style={{
														verticalAlign: 'middle',
													}}
												>
													<div>
														<div>
															<b
																style={{
																	fontSize:
																		'17px',
																}}
															>
																{item.nickname}
															</b>
															<span
																style={{
																	float: 'right',
																}}
															>
																<Rating
																	name='half-rating-read'
																	style={{
																		color: '#704de4',
																	}}
																	value={
																		item.rating
																	}
																	precision={
																		1
																	}
																	readOnly
																/>
															</span>
														</div>
														<p>
															<div className='qnaContent'>
																{item.content}
															</div>
															<div
																style={{
																	overflow:
																		'hidden',
																}}
															>
																{item.reviewImageUrl ==
																null ? (
																	''
																) : (
																	<img
																		alt=''
																		src={
																			imgUrl +
																			item.reviewImageUrl
																		}
																		className='reviewImg'
																	/>
																)}
															</div>
															<span className='qnaDay'>
																{item.writeday}
															</span>
														</p>
													</div>
													<div
														style={{
															marginTop: '30px',
															display:
																item.answerContent ==
																null
																	? 'none'
																	: 'block',
														}}
													>
														<pre className='qnaContent'>
															{item.answerContent}
														</pre>
													</div>
												</td>
											</tr>
										))}
							</tbody>
						</table>
					</div>
				)}
				{review.length === 0 ? (
					''
				) : (
					<div>
						<Pagenation
							total={review.length}
							limit={limit}
							page={page}
							setPage={setPage}
						/>
					</div>
				)}
			</div>
			<DetailHost />
		</div>
	);
}

export default DetailReview;
