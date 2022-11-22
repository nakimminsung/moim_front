import React, {useEffect, useState} from 'react';
import Pagenation from './Pagenation';

function SpaceBookingList(props) {
	// 페이징 처리
	const [spacelist, setSpacelist] = useState([]);
	const [limit, setLimit] = useState(6);
	const [page, setPage] = useState(1);
	const offset = (page - 1) * limit;

	// useEffect(() => {
	// 	let listUrl = localStorage.url + '/host/list';
	// 	// console.log(listUrl);
	// 	fetch(listUrl)
	// 		.then((res) => res.json())
	// 		.then((data) => setSpacelist(data));
	// 	// console.log(checked);
	// }, []);

	return (
		<div className='reservation'>
			<div className='reservation_list'>
				<div className='box_search'>
					<div className='box_inner'>
						<div className='one_search'>
							<div className='flex_wrap'>
								<div className='flex_box'>
									<div>예약정보 검색</div>
									<div className='flex'>
										<div className='input'>
											<input
												type={'text'}
												name='reservation_num'
												id='reservation_num'
												placeholder='예약번호 또는 예약자명'
											/>
										</div>
									</div>
									<div className='flex'>
										<span>
											<span>검색 돋보기 (넣어주기)</span>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='filter_area'>
					<div className='inner_width'>
						<div className='sorting_filter'>
							<label for='sorting'>예약번호순 정렬</label>
							<select name='sort' id='sorting'>
								<option>예약번호순정렬</option>
								<option>이용일자순정렬</option>
							</select>
						</div>
					</div>
					<div className='inner_width inner_width_shallow'>
						<div className='sorting_filter'>
							<label for='sorting'>전체상태</label>
							<select name='sort' id='sorting'>
								<option>전체상태</option>
								<option>결제대기</option>
								<option>예약확정</option>
								<option>이용완료</option>
								<option>취소환불</option>
							</select>
						</div>
					</div>
					<div className='inner_width inner_width_shallow'>
						<span>
							<span>캘린더 보기</span>
						</span>
					</div>
				</div>
				<div
					className='reservaion_state_ment'
					style={{justifyContent: 'center', display: 'flex'}}
				>
					현재 진행된 예약이 없습니다
				</div>
				<div>
					<Pagenation
						total={spacelist.length}
						limit={limit}
						page={page}
						setPage={setPage}
					/>
				</div>
			</div>
		</div>
	);
}

export default SpaceBookingList;
