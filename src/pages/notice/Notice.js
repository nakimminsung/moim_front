import {SearchRounded} from '@material-ui/icons';
import React from 'react';

function Notice(props) {
	return (
		<div className='allDiv'>
			{/* 공지사항 헤더 */}
			<div className='noticeHeader' style={{textAlign: 'center'}}>
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
						<b>공지사항 검색</b>
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
							placeholder='검색어를 입력해주세요.'
							style={{width: '85%', borderRadius: '10px'}}
						/>
						<button
							type='button'
							style={{
								width: '140px',
								height: '50px',
								backgroundColor: '#704de4',
								color: 'white',
								border: 'none',
								borderRadius: '10px',
							}}
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
				<table className='table table-striped' style={{width: '100%'}}>
					<tbody>
						<tr>
							<th>공지사항</th>
							<td>
								[이벤트] 스클 X 하리무 코엑스 광고 인증샷 이벤트
								참여하고 공간쿠폰 받으세요! (~11/28)
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Notice;
