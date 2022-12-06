import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MenuItem, Select } from '@material-ui/core'
function SellerJoin(props) {
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const navigate = useNavigate();

    const allAgreeHandler = (checked) => {
        setIsAllChecked(!isAllChecked);
        if (checked) {
            setCheckedItems([...checkedItems, "provision", "privacy"]);
        } else if (
            (!checked && checkedItems.includes("provision")) ||
            (!checked && checkedItems.includes("privacy"))
        ) {
            setCheckedItems([]);
        }
    };

    const agreeHandler = (checked, value) => {
        if (checked) {
            setCheckedItems([...checkedItems, value]);
        } else if (!checked && checkedItems.includes(value)) {
            setCheckedItems(checkedItems.filter((el) => el !== value));
        }
    };

    const fake = () => {
        alert("현재 개인정보를 수집하고 있지 않습니다🙂 안심하고 테스트 해보세요.");
    };

    useEffect(() => {
        if (checkedItems.length >= 2) {
            setIsAllChecked(true);
        } else {
            setIsAllChecked(false);
        }
    }, [checkedItems]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [placeName, setPlaceName] = useState("");
    const [businessNumber, setBusinessNumber] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [address, setAddress] = useState("");
    const [logo, setLogo] = useState("");
    const [bank, setBank] = useState("국민");
    const [accountNumber, setAccountNumber] = useState("");
    const navi = useNavigate();

    let body = {
        email: email,
        password: password,
        companyName: placeName,
        businessNumber: businessNumber,
        logoImage: '',
        phone: phoneNum,
        address: address,
        bank: bank,
        accountNumber: accountNumber
    };

    const onSubmit = async () => {
        if (email == '') {
            alert('이메일을 입력하지 않았습니다. 이메일을 입력해주세요')
        } else if (password == '') {
            alert('비밀번호를 입력하지 않았습니다. 비밀번호를 입력해주세요')
        } else if (placeName == '') {
            alert('공간명 입력하지 않았습니다. 이름을 입력해주세요')
        } else {
            const response = await axios.post(
                "http://localhost:9000/member/sellersignup",
                body,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            console.log(response.data.code);
            if (response.data.code === 1000) {
                window.location.href = "/";
                // navi('/');
            }
            alert('호스트 회원가입이 되었습니다. 로그인하여 서비스를 이용해보세요')
            navigate('/seller');
        }
    };
    // 이메일 중복 체크
    const emailCheck = async () => {
        if (email === "") {
            setCheckedEmail("필수 항목입니다.");
        } else {
            var regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
            console.log("비밀번호 유효성 검사 :: ", regex.test(email));

            if (regex.test(email)) {
                try {
                    const response = await axios.get(
                        "http://localhost:9000/member/" + email
                    );
                    if (response.data === true) {
                        setCheckedEmail("이미 존재하는 이메일 입니다.");
                    } else {
                        setCheckedEmail("가능");
                        console.log("가능");
                    }
                } catch (e) {
                    console.log(e);
                }
            } else {
                setCheckedEmail("이메일 주소를 확인해 주세요.");
            }
        }
    };

    const [checkedEmail, setCheckedEmail] = useState("");

    // 사업자 등록번호 함수

    //사업자 등록 번호 유효성 검사 메서드
    const [checkBusiNum, setCheckBusiNum] = useState('');
    function checkBizID(number) {
        var numberMap = number.replace(/-/gi, '').split('').map(function (d) {
            return parseInt(d, 10);
        });

        if (numberMap.length == 10) {
            var keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];
            var chk = 0;

            keyArr.forEach(function (d, i) {
                chk += d * numberMap[i];
            });

            chk += parseInt((keyArr[8] * numberMap[8]) / 10, 10);
            console.log(chk);
            return Math.floor(numberMap[9]) === ((10 - (chk % 10)) % 10);
        }

        return false;
    }

    const checkCorporateRegiNumber = (number) => {
        // 하이픈 붙이기
        // 첫번째 replace : 0-9아니면 못하게, 두번째 replace : 자동 하이픈, 세번째 replace:하이픈 개수 제한
        const formatNum = number.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, '$1-$2-$3').replace(/-{1,2}$/g, '');
        setBusinessNumber(formatNum)
        if (checkBizID(number) == false) {
            setCheckBusiNum(0);
        } else {
            setCheckBusiNum(1);
        }
    }
    // 휴대폰 하이픈
    const phoneNumCheck = (number) => {
        const phone = number.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3').replace(/\-{1,2}$/g, '');
        setPhoneNum(phone);
    }


    // 옵션
    const Options = [
        { key: "국민", value: "국민은행" },
        { key: "신한", value: "신한은행" },
        { key: "하나", value: "하나은행" },
        { key: "우리", value: "우리은행" },
        { key: "농협", value: "농협은행" },
    ]

    const onChangeHandler = (e) => {
        setBank(e.currentTarget.value)
        console.log(bank);
    }

    return (
        <WrapLogin>
            <HeadBannerGroup />
            <ReauthPhone>
                <LoginWrap>
                    <LoginLogo>
                        <h1>
                        </h1>
                    </LoginLogo>

                    <LoginSection>
                        <SignupStep className="wrap">
                            <Title>가입 정보 입력하기</Title>
                        </SignupStep>
                        <FormBlock>
                            <FormBlockHead>
                                <AsteriskRed>*</AsteriskRed>이메일
                            </FormBlockHead>

                            <FormBlockBody>
                                <InputTextSizeW>
                                    <EmailInput
                                        id="email"
                                        type="email"
                                        value={email}
                                        placeholder="이메일을 입력해주세요."
                                        required
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        onBlur={() => emailCheck()}
                                    />
                                </InputTextSizeW>
                                <FormError>{checkedEmail}</FormError>
                            </FormBlockBody>
                        </FormBlock>
                        <FormBlock>
                            <FormBlockHead>
                                <AsteriskRed>*</AsteriskRed> 비밀번호
                            </FormBlockHead>
                            <FormBlockBody>
                                <InputTextSizeW>
                                    <EmailInput
                                        id="password"
                                        type="password"
                                        value={password}
                                        placeholder="비밀번호 (영문+숫자+특수문자 8자 이상)"
                                        required
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </InputTextSizeW>
                            </FormBlockBody>
                            <FormBlockBody>
                                <InputTextSizeW>
                                    <EmailInput placeholder="비밀번호 확인"
                                        type="password"
                                        value={passwordConfirm}
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        required />
                                </InputTextSizeW>
                                {password.length < 1 || passwordConfirm.length < 1 ? <FormError>비밀번호를 입력하세요</FormError> :
                                    password !== passwordConfirm ? <FormError>비밀번호가 일치하지 않습니다</FormError> : <FormSuccess>비밀번호가 일치합니다.</FormSuccess>}
                            </FormBlockBody>
                        </FormBlock>


                        <FormBlock>
                            <FormBlockHead>
                                <AsteriskRed>*</AsteriskRed> 개인 / 법인명
                            </FormBlockHead>
                            <FormBlockBody>
                                <InputTextSizeWTypeL>
                                    <EmailInput
                                        id="name"
                                        value={placeName}
                                        type="text"
                                        placeholder="공간명을 입력해 주세요"
                                        required
                                        onChange={(e) => {
                                            setPlaceName(e.target.value);
                                        }}
                                    />
                                </InputTextSizeWTypeL>
                            </FormBlockBody>
                        </FormBlock>

                        <FormBlock>
                            <FormBlockHead>
                                <AsteriskRed>*</AsteriskRed> 사업자 등록번호
                            </FormBlockHead>
                            <FormBlockBody>
                                <InputTextSizeWTypeL>
                                    <EmailInput
                                        id="name"
                                        value={businessNumber}
                                        type="text"
                                        placeholder="사업자 등록번호를 입력해 주세요"
                                        required
                                        onChange={(e) => {
                                            checkCorporateRegiNumber(e.target.value);
                                        }}
                                    />
                                </InputTextSizeWTypeL>
                                {checkBusiNum.length < 1 || checkBusiNum.length < 1 ? <FormError>사업자 등록번호를 입력하세요</FormError> :
                                    checkBusiNum === 0 ? <FormError>올바르지 않은 사업자 등록번호입니다.</FormError> :
                                        <FormSuccess>유효한 사업자 등록번호입니다.</FormSuccess>}
                            </FormBlockBody>
                        </FormBlock>

                        <FormBlock>
                            <FormBlockHead>
                                <AsteriskRed>*</AsteriskRed> 사업자 주소
                            </FormBlockHead>
                            <FormBlockBody>
                                <InputTextSizeWTypeL>
                                    <EmailInput
                                        id="name"
                                        value={address}
                                        type="text"
                                        placeholder="주소를 입력해 주세요"
                                        required
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                        }}
                                    />
                                </InputTextSizeWTypeL>
                            </FormBlockBody>
                        </FormBlock>

                        <FormBlock>
                            <FormBlockHead>
                                전화번호
                            </FormBlockHead>
                            <FormBlockBody>
                                <InputTextSizeWTypeL>
                                    <EmailInput
                                        id="name"
                                        value={phoneNum}
                                        type="text"
                                        placeholder="전화번호를 입력해 주세요"
                                        required
                                        onChange={(e) => {
                                            phoneNumCheck(e.target.value)
                                        }}
                                    />
                                </InputTextSizeWTypeL>
                            </FormBlockBody>
                        </FormBlock>

                        <FormBlock>
                            <FormBlockHead>
                                <AsteriskRed>*</AsteriskRed> 은행
                            </FormBlockHead>
                            <FormBlockBody>
                                <select onChange={onChangeHandler} value={bank}
                                    defaultValue={bank}>
                                    {Options.map((item, index) => (
                                        <option key={item.key} value={item.key}>{item.value}</option>
                                    ))}
                                </select>

                            </FormBlockBody>
                        </FormBlock>

                        <FormBlock>
                            <FormBlockHead>
                                <AsteriskRed>*</AsteriskRed> 계좌번호
                            </FormBlockHead>
                            <FormBlockBody>
                                <InputTextSizeWTypeL>
                                    <EmailInput
                                        id="name"
                                        value={accountNumber}
                                        type="text"
                                        placeholder="계좌번호를 입력해주세요"
                                        required
                                        onChange={(e) => {
                                            setAccountNumber(e.target.value);
                                        }}
                                    />
                                </InputTextSizeWTypeL>
                            </FormBlockBody>
                        </FormBlock>

                        <FormBlockCheckAllWrap>
                            <Terms>
                                <TermsHead>
                                    <InputCheckBox>
                                        <input
                                            type="checkbox"
                                            value="agree"
                                            onChange={(e) => {
                                                allAgreeHandler(e.currentTarget.checked);
                                            }}
                                            checked={isAllChecked}
                                        />
                                    </InputCheckBox>
                                    <TermsLabel onClick={fake}>모두 동의합니다.</TermsLabel>
                                </TermsHead>

                                <TermsBody>
                                    <TermsItem>
                                        <InputCheckBox>
                                            {/* <Terms1 type="checkbox"></Terms1> */}
                                            <input
                                                type="checkbox"
                                                value="provision"
                                                onChange={(e) => {
                                                    agreeHandler(e.currentTarget.checked, e.target.value);
                                                }}
                                                checked={
                                                    checkedItems.includes("provision") ? true : false
                                                }
                                            />
                                        </InputCheckBox>
                                        <Terms1Label>만 14세 이상입니다.</Terms1Label>
                                    </TermsItem>
                                    {/*  */}
                                    <TermsItem>
                                        <InputCheckBox>
                                            {/* <Terms1 type="checkbox"></Terms1> */}
                                            <input
                                                type="checkbox"
                                                value="privacy"
                                                onChange={(e) => {
                                                    agreeHandler(e.currentTarget.checked, e.target.value);
                                                }}
                                                checked={
                                                    checkedItems.includes("privacy") ? true : false
                                                }
                                            />
                                        </InputCheckBox>
                                        <Terms2A onClick={fake}>이용약관 필수 동의</Terms2A>
                                    </TermsItem>
                                    {/*  */}
                                </TermsBody>
                            </Terms>

                            <Terms1Error />
                            <TermsError />
                        </FormBlockCheckAllWrap>

                        <FormBlockSubmit>
                            <FormBlockBody>
                                <BtnLogin
                                    type="button"
                                    onClick={() => {
                                        onSubmit();
                                    }}
                                >
                                    회원가입하기
                                </BtnLogin>
                            </FormBlockBody>
                        </FormBlockSubmit>
                    </LoginSection>
                </LoginWrap>
            </ReauthPhone>
        </WrapLogin>
    );
}

const AuthBtn = styled.button`
  display: inline-block;
  vertical-align: middle;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  font-size: 10px;
  text-align: center;
  white-space: nowrap;
  line-height: 1.4;
  background: #eee !important;
  color: #aaa !important;
  border: 1px solid #ddd !important;
  cursor: default !important;
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  position: absolute;
  top: 0;
  right: 0;
  position: absolute;
  width: 100px;
`;

const BtnLogin = styled.button`
  border-radius: 2px;
  text-align: center;
  white-space: nowrap;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  color: #fff;
  background: #f1c333;
  border: 1px solid #f1c333;
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-size: 16px;
`;

const FormBlockSubmit = styled.div`
  text-align: left;
  margin: 20px 0 0;
`;

const TermsError = styled.span`
  display: none;
  cursor: default !important;
  color: #ff4b50;
  margin: 10px 0 0;
`;

const Terms1Error = styled.span`
  color: #ff4b50;
  margin: 10px 0 0;
  display: block !important;
  cursor: default !important;
`;
const Terms2A = styled.a`
  text-decoration: none;
  overflow: hidden;
  color:black;
  display: block;
  font-size: 14px;
`;

const Terms1Label = styled.label`
  overflow: hidden;
  display: block;
  font-size: 14px;
`;

const Terms1 = styled.input`
  // -webkit-appearance: none;
  background: #f1c333;
  display: inline-block;
  position: relative;
  height: 18px;
  width: 18px;
  vertical-align: middle;
  box-sizing: border-box;
  border: 0;
  margin: 0;

  &:before {
    // content: ${(props) => (props.checked ? console.log("✓") : "")};
    cursor: pointer;
    // content: ${(props) => (props.checked ? console.log("✓") : "")};
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

const TermsItem = styled.div`
  margin-top: 5px;
`;

const TermsLabel = styled.label`
  overflow: hidden;
  display: block;
  font-size: 14px;
`;
const InputCheckBox = styled.div`
  float: left;
  margin-right: 10px;
  display: inline-block;
`;

const TermsBody = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
`;

const TermsHead = styled.div`
  border-bottom: 1px solid #333;
  padding: 5px 0;
`;

const Terms = styled.div`
  text-align: left;
  margin: 20px 0 0;
`;

const FormBlockCheckAllWrap = styled.div`
  text-align: left;
  margin: 20px 0 0;
`;

const UiInputBtnCombo = styled.div`
  position: relative;
  padding-right: 105px;
`;

const EmailInput = styled.input`
  font-size: 14px;
  height: 48px;
  background: #fff;
  line-height: 16px;
  border: 1px solid #acacac;
  width: 100%;
  box-sizing: border-box;
  padding: 2px 8px;
  border-radius: 2px;
  appearance: none;
`;

const InputTextSizeWTypeL = styled.div`
  box-sizing: border-box;
  vertical-align: middle;
  height: 48px;
  display: block;
  width: 100%;
  margin-top: 10px;
  text-align: left;
`;

const FormError = styled.span`
  color: #ff4b50;
  margin: 10px 0 0;
  display: block;
  cursor: default !important;
`;

const FormSuccess = styled.span`
  color: green;
  margin: 10px 0 0;
  display: block;
  cursor: default !important;
`;

const InputTextSizeW = styled.div`
  &.formError {
    cursor: default !important;
  }
  display: block;
  width: 100%;
  margin-top: 10px;
  text-align: left;
  vertical-align: middle;
  box-sizing: border-box;
`;

const FormBlockBody = styled.div`
  text-align: left;
`;

const AsteriskRed = styled.em`
  color: #ff4b50;
  font-size: 18px;
  display: inline-block;
`;

const FormBlockHead = styled.label`
  font-size: 14px;
`;

const FormBlock = styled.div`
  text-align: left;
  margin: 20px 0 0;
`;
const Title = styled.h3``;
const IsActive = styled.li``;

const SignupStep = styled.div`
  text-align: center;
  margin: 45px 0 20px;

  ${Title} {
    font-size: 18px;
    font-weight: normal;
  }

  &.wrap {
    text-align: center;
    margin: 45px 0 20px;

    ${IsActive} {
      color: #fff;
      border-color: #f1c333;
      background: #f1c333;
    }

    ul {
      display: inline-block;
      position: relative;
      border-top: 1px solid #aaa;
      width:200px;
    }

    li {
      position: relative;
      top: -15px;
      left: -15px;
      z-index: 10;
      background: #fff;
      color: #999;
      border: 1px solid #999;
      display: inline-block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      -webkit-border-radius: 20px;
      border-radius: 20px;
    }

    li + li {
      margin-left: 50px;
    }
  }
`;

const LoginTitle = styled.h2`
  font-size: 14px;
  color: #333;
  text-align: center;
  position: relative;
  top: -10px;
  background: #fff;
  display: inline-block;
  padding: 0 10px;
`;

const LoginSection = styled.section`
  text-align: center;
  margin-top: 50px;
  border-top: 1px solid #333;
  padding-bottom: 100px;
`;

const SpIcon = styled.span`
  background-image: url(https://www.idus.com/resources/dist/images/sp/sp-icon_1634026706070.png);

  height: 0;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  font-size: 0;
  line-height: 0;
  letter-spacing: 0;
  background-position: -91px -488px;
  width: 100px;
  padding-top: 40px;
`;

const LogoA = styled.div`
  display: block;
`;

const LoginLogo = styled.div`
  padding-top: 40px;
  text-align: center;
  padding: 40px 0 0;
`;

const LoginWrap = styled.div`
  padding: 1px 0 50px;
  min-height: 100%;
  background: #fff;
`;

const ReauthPhone = styled.form`
  width: 384px;
  display: block;
  margin: 0 auto;
`;

const HeadBannerGroup = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const WrapLogin = styled.div`
  padding: 1px 0 50px;
  min-height: 100%;
  background: #fff;
`;



export default SellerJoin;