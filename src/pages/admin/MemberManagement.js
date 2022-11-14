import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import {SearchRounded} from '@material-ui/icons';
import React from 'react';

function MemberManagement(props) {
	return (
		<div>
			{/* 검색 */}
			<div
				className='memberSearch'
				style={{
					width: '1000px',
					border: '1px solid gray',
					borderRadius: '10px',
				}}
			>
				<SearchRounded
					style={{
						fontSize: '30px',
						marginLeft: '10px',
						marginRight: '20px',
						cursor: 'pointer',
						color: 'gray',
					}}
				/>
				<input
					type={'text'}
					className='seacrhContainer'
					style={{
						width: '800px',
						height: '60px',
						marginTop: '3px',
						outline: 'none',
						border: 'none',
						backgroundColor: 'rgba(240, 242, 245)',
					}}
					placeholder='회원의 이름 또는 이메일을 입력해주세요'
				/>
			</div>
			<div
				className='memberList'
				style={{marginTop: '20px', width: '100%'}}
			>
				<table className='table table-bordered'>
					<thead style={{textAlign: 'center'}}>
						<tr>
							<th>번호</th>
							<th>이메일</th>
							<th>회원명</th>
							<th>회원가입일</th>
							<th>정보수정일</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style={{textAlign: 'center'}}>1</td>
							<td>ㄹ</td>
							<td>1</td>
							<td>1</td>
							<td>1</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default MemberManagement;
