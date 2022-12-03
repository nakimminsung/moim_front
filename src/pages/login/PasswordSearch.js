import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import FindPassword from "./FindPassword";

function PasswordSearch(props) {
  const [email, setEmail] = useState('');
  const [emailSocial, setEmailSocial] = useState('');
  const navi = useNavigate();

  const checkSocial = () => {
    axios.get(
      'http://localhost:9000/member/checksocial?email=' + email
    ).then((res) => {
      console.log(res.data)
      setEmailSocial(res.data)
      // console.log(emailSocial)

    });
  }

  const move = () => {

    checkSocial()
    console.log(emailSocial)
    if (emailSocial == 'social') {
      alert('소셜로 가입한 경우에는 비밀번호 변경이 불가합니다.')
      navi('/login')
    } else {
      navi('/passwordsearch2', {
        state: {
          email: { email }
        }
      });
    }
  };

  useEffect(() => {
    checkSocial()
  }, [email]);

  return (
    <div>
      <LoginWrap>
        <LoginContainer>
          <LoginHeadLogo>
            <h2>MoiM</h2>
            <br />
            <h5>
              비밀번호를 찾고자하는 아이디를 입력해주세요
            </h5>
            <br />
          </LoginHeadLogo>
          <LoginSignupContent>
          </LoginSignupContent>
          <LoginSigninContent>
            <BorderAndText>
              <span>이메일 로그인</span>
            </BorderAndText>
            <EmailLoginContainer>
              <div>
                <EmailLoginInput
                  id="email"
                  type="email"
                  value={email}
                  placeholder="이메일"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </EmailLoginContainer>
            <CommonButton
              type="button"
              onClick={move}
            >
              다음
            </CommonButton>
          </LoginSigninContent>
          <MoveSignUP>
            <span>아이디가 기억나지 않는다면? <a href='/signUp'>아이디 찾기</a></span>
          </MoveSignUP>
        </LoginContainer>
      </LoginWrap>

    </div>
  );
}

export default PasswordSearch;


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

const Bp = styled.input`
  -webkit-appearance: none;
  background: transparent;
  display: inline-block;
  position: relative;
  height: 18px;
  width: 18px;
  vertical-align: middle;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 0;
  margin: 0;

  &:before {
    cursor: pointer;
    content: "";
    display: inline-block;
    line-height: 16px;
    width: 16px;
    height: 16px;
    background: #fff;
    position: absolute;
    top: 0px;
    left: 0px;
    border: 1px solid #acacac;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    text-align: center;
  }
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

const LoginSignupContent = styled.div``;

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

const MoveSignUP = styled.div`
  margin-top:10px;
  text-align:center;
  font-size:15px;
`;

