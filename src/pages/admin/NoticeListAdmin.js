import axios from 'axios';
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

function NoticeListAdmin(props) {
	const {noticeList, setNoticeList, searchWord} = props;

	const getNoticeList = () => {
		let url =
			localStorage.url + '/admin/noticeList?searchWord=' + searchWord;
		console.log(url);

		axios.get(url).then((res) => {
			setNoticeList(res.data);
		});
	};

	useEffect(() => {
		//멤버 리스트 가져오기
		getNoticeList();
	}, [searchWord]); //searchWord 값이 바뀔때마다

	return (
		<div className='noticeTable' style={{marginTop: '20px', width: '100%'}}>
			<table className='table table-bordered' style={{width: '100%'}}>
				<thead>
					<tr style={{textAlign: 'center'}}>
						<th style={{width: '5%'}}>번호</th>
						<th style={{width: '10%'}}>유형</th>
						<th>제목</th>
						<th style={{width: '15%'}}>작성일자</th>
						<th style={{width: '20%'}}>수정 / 삭제</th>
					</tr>
				</thead>
				<tbody>
					{noticeList.length === 0 ? (
						//데이터가 없을때
						<tr>
							<td colSpan={4} style={{textAlign: 'center'}}>
								<h5>등록된 게시글이 없습니다</h5>
							</td>
						</tr>
					) : (
						noticeList &&
						noticeList.map((row, idx) => (
							<tr style={{verticalAlign: 'middle'}} key={idx}>
								<td>{idx + 1}</td>
								<td>{row.type}</td>
								<td>
									{/* <Link to={'/notice'}>{row.title}</Link> */}
									<span
										style={{
											textDecoration: 'underLine',
											cursor: 'pointer',
										}}
										onClick={() =>
											window.open('/notice', '_blank')
										}
									>
										{row.title}
									</span>
								</td>
								<td>{row.writeday}</td>
								<td>
									<button
										type='button'
										className='btn btn-outline-secondary'
									>
										수정
									</button>
									&emsp;
									<button
										type='button'
										className='btn btn-outline-danger'
									>
										삭제
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

export default NoticeListAdmin;
