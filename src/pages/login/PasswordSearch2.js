import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';
function PasswordSearch2(props) {

  // 자동 focus ref
  const focusRef = useRef(null);
  useEffect(() => {
    focusRef.current.focus();
  }, []);

  const location = useLocation();
  // const form = new FormData();
  // const { idx } = jwt_decode(localStorage.getItem('token')).idx;
  // 인증메일 보낼 이메일 주소
  const { email } = location.state.email;
  // 인증번호
  const [confirmEmail, setConfirmEmail] = useState('');
  // 인증메일 전송 여부
  const [numcheck, setNumcheck] = useState('0');
  // 인증번호 입력값
  const [inputNum, setInputNum] = useState('')

  // 새로운 비밀번호
  const [newPassword, setNewPassword] = useState('');
  // 새로운 비밀번호 확인
  const [newPassword2, setNewPassword2] = useState('');

  const navi = useNavigate();
  const url = 'http://localhost:9000/login/mailConfirm';
  // form.append('email', { email });

  const sendEmail = () => {
    axios.post(
      // url: 
      // RequestParan으로 key value 받기
      'http://localhost:9000/login/mailConfirm?email=' +
      email
      // method: 'post',
      // data: 
      // form
      // { email: { email } }
      // email: { email }
      // headers: { 'Content-Type': 'multipart/form-data' }
    ).then((res) => {
      alert('인증코드를 전송했습니다.')
      //파라미터를 res가 받고(response 를 뜻함) String으로 보냈음(Public String)
      //스프링에서 map이 아닌 String으로 업로드한 파일명을 리턴했으므로 res가 곧 파일명임
      // setThumbnailImage(res.data);
      setConfirmEmail(res.data);
      setNumcheck('1');
      // console.log(confirmEmail)
    });
  };

  const passwordChange = () => {
    axios.post(
      // url: 
      // RequestParan으로 key value 받기
      'http://localhost:9000/member/updatePassword?password=' +
      newPassword + '&email=' + email
    ).then((res) => {
      // alert('인증코드를 전송했습니다.')
      // setConfirmEmail(res.data);
      // setNumcheck('1');
      console.log(res.data)
    });
  }

  const confirmNumCheck = () => {
    console.log(confirmEmail)
    if (confirmEmail == inputNum) {
      alert('인증되었습니다. 새로운 비밀번호를 입력해주세요')
    } else {
      alert('인증번호가 일치하지 않습니다. 다시 입력해주세요')
    }
  }

  const confirmNewPassword = () => {
    // console.log(newPassword)
    // console.log(newPassword2)
    if (newPassword == '') {
      alert('새로운 비밀번호를 입력하지 않았습니다. ')
    } else if (newPassword == newPassword2) {
      passwordChange()
      alert('비밀번호가 변경되었습니다. 다시 로그인 해주세요')
      navi('/');
    } else {
      alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요')
      return;
    }
  }


  return (
    <div>
      <LoginWrap>
        <LoginContainer>
          <LoginHeadLogo>
            <h2>
              비밀번호 초기화
            </h2>
            <br />
          </LoginHeadLogo>
          <LoginSigninContent>
            <BorderAndText>
              <span>이메일 로그인</span>
            </BorderAndText>
            <EmailLoginContainer>
              <div>
                <CheckNumInput
                  id="email"
                  type="email"
                  // value={email}
                  placeholder="인증번호"
                  required
                  onChange={(e) => {
                    setInputNum(e.target.value);
                  }}
                />
                {numcheck == 0 ?
                  <Button variant="outlined" style={{ marginLeft: '13px' }}
                    onClick={sendEmail}>인증번호 전송</Button> :
                  <Button variant="outlined" color="secondary" style={{ marginLeft: '13px' }}
                    onClick={confirmNumCheck}>인증번호 확인</Button>
                }
                <EmailLoginInput
                  id="email"
                  type="email"
                  value={newPassword}
                  placeholder="새비밀번호"
                  required
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
                <EmailLoginInput
                  id="password"
                  type="password"
                  value={newPassword2}
                  placeholder="새비밀번호 확인"
                  required
                  ref={focusRef}
                  onChange={(e) => {
                    setNewPassword2(e.target.value)
                  }}
                />
              </div>
            </EmailLoginContainer>
            <CommonButton
              type="button"
              onClick={() => {
                confirmNewPassword()
              }}
            >
              비밀번호 변경하기
            </CommonButton>
          </LoginSigninContent>
        </LoginContainer>
      </LoginWrap>
    </div>
  );
}

const CommonButton = styled.button`
  margin-top: 6px;
  width: 100%;
  height: 44px;
  border-radius: 2px;
  border: none;
  background: #f1c333;
  color: #ffffff;
  font-size: 16px;
  line-height: 30px;
  padding: 0 16px;
  display: inline-block;
  box-shadow: 0 1px 3px 0 rgb(220 220 220 / 30%);
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  transition: border-color 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  vertical-align: middle;
  margin-top:20px;
`;

const EmailLoginInput = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 2px;
  border: 1px solid #b4b4b4;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  padding: 0 15px;
  font-size: 14px;
  outline: none;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CheckNumInput = styled.input`
  width: 65%;
  height: 35px;
  border-radius: 2px;
  border: 1px solid #b4b4b4;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  padding: 0 15px;
  font-size: 14px;
  outline: none;
  float: left;
  &:last-child {
    margin-bottom: 0;
  }
`;

const EmailLoginContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const LoginSigninContent = styled.div``;


const BorderAndText = styled.div`
  border-top: 1px solid #999999;
  color: #999999;
  display: flex;
  justify-content: center;

  span {
    font-size: 12px;
    margin-top: -8px;
    background: #ffffff;
    width: 130px;
    text-align: center;
  }
`;

const LoginHeadLogo = styled.div`
  text-align: center;
  padding-top: 20px;
  margin-bottom: 10px;
`;

const LoginContainer = styled.div`
  background: #ffffff;

  @media (min-width: 720px) {
    padding: 1px 0 50px;
    width: 384px;
    display: block;
    margin: 0 auto;
  }
`;

const LoginWrap = styled.div`
  padding: 1px 0 50px;
  min-height: 100%;
  background: #fff;
`;

export default PasswordSearch2;