import React, { useEffect, useState } from 'react';
import './mypage.css';
import jwt_decode from 'jwt-decode';
import { Button } from '@material-ui/core';
import ProfileUpdate from './ProfileUpdate';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// const useStyles = makeStyles((theme) => ({
//     // margin: {
//     //     // margin: theme.spacing(1),
//     // },
// }));

function MyContent(props) {
    // const classes = useStyles();
    const navi = useNavigate();
    const token = jwt_decode(localStorage.getItem('token'));
    const memberNum = jwt_decode(localStorage.getItem('token')).idx;
    // const memberList = props;
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [newPassword, setNewPassword] = useState('');
    // 닉네임 변경 이벤트
    const [changeStatus, setChangeStatus] = useState(0);
    const [changeButton, setChangeButton] = useState(0);
    // 비밀번호 변경 이벤트
    const [changepwStatus, setChangepwStatus] = useState(0);
    const [changepwButton, setChangepwButton] = useState(0);

    // 비밀번호 변경 mui
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const getMemberInfo = () => {
        let url = localStorage.url + '/member/getMemberInfo?idx=' + memberNum;

        axios.get(url).then((res) => {
            setNickname(res.data.nickname);
            setEmail(res.data.email);
        });
    }
    const nicknameChange = () => {
        setChangeStatus(1);
        setChangeButton(1);
    }

    const nicknameChangeEvent = () => {
        let url = localStorage.url + '/member/updateNickname';
        //formData로 한번에 보내기
        const updateData = new FormData();
        updateData.append('idx', memberNum);
        updateData.append('nickname', nickname);

        axios({
            method: 'post',
            url: url, //BackEnd로 보낼 url
            data: updateData,
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then((res) => {
            console.log('res.data=' + res.data);
            alert('수정 완료되었습니다.');

            //성공하고 화면 리로드
            window.location.reload();
        });
    }
    const hideEmail = () => {
        let splitName = email.split('')      //입력받은 문자값을 단어하나하나로 쪼갠다.
        splitName.forEach((name, i) => {
            if (i <= 3) return                //문자값의 4번째 이후의 수에는 *를 리턴한다.
            splitName[i] = '*'
        })
        let filterName = splitName.join().replace(/,/g, '')
        setEmail(filterName.substring(0, 8)) //정규식
    }

    const passwordChange = () => {
        axios.post(
            // url: 
            // RequestParan으로 key value 받기
            'http://localhost:9000/member/updatePassword?password=' +
            newPassword + '&email=' + email
        ).then((res) => {
            console.log(res.data)
            alert('정상적으로 비밀번호가 변경되었습니다.')
            window.location.reload();
        });
    }

    const passwordsearch = () => {
        setChangepwButton(1);
    }


    const deleteMember = () => {
        //confirm alert
        if (window.confirm('회원에서 탈퇴하시겠습니까?')) {
            let url = localStorage.url + '/member/delete?idx=' + memberNum
            console.log(url);

            //Back-End로 url 넘김
            axios.delete(url).then((res) => {
                //성공하고 리스트 다시 가져오기
                // window.location.reload();
                localStorage.clear();
                sessionStorage.clear();
                document.location.href = '/';
            });

            //삭제완료 alert
            alert('탈퇴 완료되었습니다.');
        } else {
            //아니오
            alert('취소하셨습니다');
        }
    };

    useEffect(() => {
        getMemberInfo()
        hideEmail()
        // console.log(memberList);
    }, [])

    console.log(email)
    return (
        <div className="my-content-wrapper">
            <div className="my-content-profile" style={{ textAlign: "center" }}>
                <div className="my-profile-update" style={{ display: "flex", display: "inline-block", marginTop: '30px', marginBottom: '5px' }}>
                    <img alt="updateprofileImage" src={`${props.memberList.profile_image}`} className="updateprofileImage" />
                    {/* } */}
                </div>
                <div>
                    <b style={{ fontSize: '12px' }}>{email}</b>
                    <br />
                    <ProfileUpdate idx={memberNum} />
                    {/* <button style={{ marginTop: '5px' }}>프로필 사진 변경</button> */}
                </div>
                <hr />
                <div className="my-profile-right" style={{
                    paddingLeft: "10px", display: "flex", flexDirection: "column",
                    justifyContent: "center", alignItems: "flex"
                }}>
                    <table style={{ width: '600px', height: '400px' }}>
                        <tbody>
                            <tr>
                                <td style={{ textAlign: 'left' }}>닉네임</td>
                                <td style={{ textAlign: 'left' }}>{
                                    changeStatus == 0 ? nickname :
                                        <TextField
                                            // className={classes.margin}
                                            id="input-with-icon-textfield"
                                            // label=""
                                            value={nickname}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircle />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onChange={(e) => {
                                                setNickname(e.target.value);
                                            }}
                                        />
                                }
                                </td>
                                <td style={{ textAlign: 'left' }}>{
                                    changeButton == 0 ?
                                        <Button variant="outlined" color="primary" size="small"
                                            onClick={nicknameChange}>
                                            변경하기
                                        </Button>
                                        :
                                        <Button variant="outlined" color="primary" size="small"
                                            onClick={nicknameChangeEvent}>
                                            확인
                                        </Button>
                                }
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>비밀번호</td>
                                <td style={{ textAlign: 'left' }}>
                                    {(props.memberList.password !== 'kakao' && changepwButton == 0) ? <Button variant="outlined" color="primary" size="small"
                                        onClick={passwordsearch}>비밀번호 변경하기</Button> : (props.memberList.password !== 'kakao' && changepwButton == 1) ?
                                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                            <Input
                                                id="standard-adornment-password"
                                                type={values.showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                onChange={handleChange('password')}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        : <b style={{ color: 'red' }}>소셜로그인은 비밀번호 변경 불가</b>}
                                </td>
                                <td style={{ textAlign: 'left' }}>
                                    {changepwButton == 1 ? <Button variant="outlined" color="primary" size="small"
                                        onClick={passwordChange}>확인</Button> :
                                        <></>}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>이메일</td>
                                <td style={{ textAlign: 'left' }}>{email}</td>
                                <td style={{ textAlign: 'left', color: '#ffd014' }}>인증완료</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>연락처</td>
                                <td style={{ textAlign: 'left' }}>휴대폰 정보 없음</td>
                                <td style={{ textAlign: 'left' }}>
                                    <Button variant="outlined" color="primary" size="small">
                                        인증하기
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>SNS연동</td>
                                <td style={{ textAlign: 'left' }}>
                                    {props.memberList.password !== 'kakao' ? <b style={{ color: 'red' }}>연동 정보 없음</b> :
                                        <div>
                                            <img src={"image/kakao.png"} alt="카카오" style={{ width: '25px', height: '25px', marginRight: '5px' }} />
                                            <b>카카오연동</b>
                                        </div>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <div>
                        <Button variant="outlined" style={{ width: '150px', textAlign: 'center' }}
                            color="secondary" onClick={() => {
                                deleteMember();
                            }}>서비스 탈퇴하기</Button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default MyContent;