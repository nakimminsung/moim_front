import {SearchRounded} from '@material-ui/icons';
import React, {useRef, useState} from 'react';

function NoticeListAdmin(props) {
	return (
		<div className='noticeTable' style={{marginTop: '20px', width: '100%'}}>
			<table className='table table-bordered' style={{width: '100%'}}>
				<thead>
					<tr style={{textAlign: 'center'}}>
						<th style={{width: '10%'}}>유형</th>
						<th>제목</th>
						<th style={{width: '15%'}}>작성일자</th>
						<th style={{width: '20%'}}>수정/삭제</th>
					</tr>
				</thead>
				<tbody>
					<tr style={{verticalAlign: 'middle'}}>
						<td>이벤트</td>
						<td>
							스클 X 하리무 코엑스 광고 인증샷 이벤트 참여하고
							공간쿠폰 받으세요! (~11/28)
						</td>
						<td>작성일</td>
						<td>
							<button
								type='button'
								className='btn btn-outline-secondary'
							>
								수정
							</button>
							&nbsp;
							<button
								type='button'
								className='btn btn-outline-danger'
							>
								삭제
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default NoticeListAdmin;
