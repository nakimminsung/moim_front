import { Button } from '@material-ui/core';
import React, { useState } from 'react';
//dialogue 관련
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

function ProfileUpdate(props) {
    var num = props;

    //modal dialogue : OPEN / CLOSE
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        //클릭할때마다 DB정보를 가져오므로 값 비워줄필요 없음
    };

    //modal 내부의 select style 관련
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    const [updateFile, setUpdateFile] = useState('');
    const [oldPhoto, setoldPhoto] = useState('');

    //modal 내부의 파일 변경 이벤트
    const uploadFileHandler = (e) => {
        e.preventDefault();
        setUpdateFile(e.target.files[0]);
    };

    //modal submit 이벤트
    const submitHandler = (e) => {
        e.preventDefault();
        // BackEnd로 보낼 url
        // let url = localStorage.url + '/admin/noticeInsert?num=' + num;
        let url = localStorage.url + '/member/modify/profileImage';

        //formData로 한번에 보내기
        const updateData = new FormData();
        updateData.append('updateFile', updateFile);
        updateData.append('idx', props.idx);
        updateData.append('oldPhoto', oldPhoto);

        //url로 body 데이터를 보낸다
        axios({
            method: 'patch',
            url: url, //BackEnd로 보낼 url
            data: updateData,
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then((res) => {
            console.log('res.data=' + res.profile_image);
            alert('수정 완료되었습니다.');

            //성공하고 비워주기
            setUpdateFile([]);
            setoldPhoto('');

            //성공하고 화면 리로드
            window.location.reload();
        });

        //성공하고 modal 창 닫기
        setOpen(false);

    };

    return (
        <div>
            <Button variant="outlined" style={{ marginTop: '5px' }}
                onClick={handleClickOpen}>프로필 사진 변경</Button>

            {/* Dialogue Modal 화면 : 공지사항 수정 update 폼 */}
            <div>
                <form onSubmit={submitHandler}>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle
                            style={{
                                backgroundColor: '#A06CEF',
                                color: 'white',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                            }}
                        >
                            프로필 사진 수정
                        </DialogTitle>
                        <DialogContent>
                            <p style={{ color: 'skyblue' }}>
                                * 첨부하지 않을 경우 기존 사진이 유지됩니다.
                            </p>
                            <input
                                type={'file'}
                                className='form-control'
                                onChange={uploadFileHandler}
                            />
                        </DialogContent>
                        <DialogActions style={{ marginRight: '15px' }}>
                            <button
                                type='button'
                                className='btn btn-outline-secondary'
                                onClick={handleClose}
                            >
                                취소
                            </button>
                            &nbsp;&nbsp;
                            <button
                                type='submit'
                                className='btn btn-dark'
                                onClick={submitHandler}
                            >
                                저장
                            </button>
                        </DialogActions>
                    </Dialog>
                </form>
            </div>
        </div>
    );
}

export default ProfileUpdate;