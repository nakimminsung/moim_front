import React from 'react';
import {NavLink} from 'react-router-dom';
import './Footer.css';

function footer(props) {
	return (
		<footer className='layFooter'>
			<div>
				<div
					className='footer-wrapper'
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<div
						className='footer-content'
						style={{
							maxWidth: 1200,
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							padding: '10px 0',
						}}
					>
						<div
							className='footer-left'
							style={{
								width: '5%',
								textAlign: 'right',
								paddingRight: 10,
							}}
						></div>
						<div
							className='footer-right'
							style={{
								width: '95%',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							<div>
								<div>
									<b style={{fontSize: 20}}>모임</b>
									<br />
									<span>(주)모임 : 김병찬</span>&nbsp;&nbsp;
									<span>
										주소 : 서울특별시 강남구 역삼동
										테헤란로5길 7 위워크
									</span>
								</div>
								<div>
									<span>사업자등록번호 : 120-81-47525</span>
									&nbsp;&nbsp;
									<span>
										통신판매업신고번호 : 제2022 - 서울 -
										0011호
									</span>
									&nbsp;&nbsp;
									<span>호스팅 사업자 : (주)모임</span>
								</div>
								<span style={{display: 'block'}}>
									구매안전서비스 : 가입사실확인이메일 :
									cs@moim.com
								</span>
								<span style={{display: 'block'}}>
									고객센터 : 1544-2431 (통화료 발생 / 평일
									09:00~19:00) 톡상담하기 (평일 09:00~19:00)
								</span>
								<span style={{display: 'block'}}>
									©moim Corp. All rights reserved
								</span>
							</div>
							<div
								style={{
									position: 'relative',
									float: 'right',
									width: 420,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-end',
								}}
							>
								<span className='footer-link'>
									<a>고객센터</a>
									&nbsp;|&nbsp;
									<a>이용약관</a>
									&nbsp;|&nbsp;
									<a>개인정보처리방침</a>
									&nbsp;|&nbsp;
									<a>지식재산권보호센터</a>
									{/* &nbsp;|&nbsp;
									<NavLink to={'/admin'}>admin</NavLink> */}
								</span>
								<img
									alt=''
									src='https://gift-s.kakaocdn.net/dn/gift/images/m640/img_pcfamily.png'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default footer;
