import React from 'react';

function Mypage(props) {
	return (
		<div>
			<div className="randomNumCheck">
				<h3>인증번호 확인</h3>
				<hr style={{ width: '130px', height: '10px', position: 'relative', top: '-25px', left: '156px', color: '#cff0cc', opacity: '1', zIndex: '-1' }} />
				<input type="hidden" className="num" value="${num}" />
				인증번호: <input type="text" className="randomNum" placeholder="인증번호" />
				<button className="numCheck">확인</button>
			</div>


			<div className="updatePass" style={{ display: 'none' }}>
				비밀번호: <input type="password" className="pass1" name="password" placeholder="영문,숫자,특수문자(최소 8자리)" required="required" /><br />
				비밀번호 확인: <input type="password" className="pass2" placeholder="영문,숫자,특수문자(최소 8자리)" required="required" /><br />

				<button className="btn btn-secondary" id="btnSend">확인</button>
			</div>

			<div className="updatePass" style={{ display: 'none' }}>

				<form action="../searchPass2" method="get" enctype="multipart/form-data">
					<input type="hidden" name="email" value="${sessionScope.email}" />

					비밀번호: <input type="password" className="pass1" name="password" placeholder="영문,숫자,특수문자(최소 8자리)" required="required" /><br />
					비밀번호 확인: <input type="password" className="pass2" placeholder="영문,숫자,특수문자(최소 8자리)" required="required" /><br />

					<button type="submit" className="btn btn-secondary" id="btnSend">확인</button>
				</form>
			</div>
			<h3>비밀번호 재설정</h3>
			<hr style={{ width: '150px', height: '10px', position: 'relative', top: '-25px', left: '148px', color: '#cff0cc', opacity: '1', zIndex: '-1' }} />
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;비밀번호: <input type="password" className="pass1" name="password" placeholder="영문,숫자,특수문자(최소 8자리)" required="required" /><br />
			<div id="psCheck" style={{ fontSize: '13px', marginLeft: '50px' }}></div>
			비밀번호 확인: <input type="password" className="pass2" placeholder="영문,숫자,특수문자(최소 8자리)" style={{ marginTop: '5px' }} required="required" /><br />
			<div id="psCheck1" style={{ fontSize: '13px', marginLeft: '88px' }}></div>
			<br />
			<button className="btn btn-outline-secondary" id="btnSend">확인</button>
		</div>
	);
}

export default Mypage;