import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function FindPassword(props) {

    const navi = useNavigate();
    return (
        <div>
            {/* <a>아이디 / 비밀번호 찾기</a> */}
            <Button variant="outlined" style={{ marginTop: '5px' }}
                onClick={() => {
                    navi('/passwordsearch')
                }}>아이디/비밀번호 찾기</Button>

        </div>
    );
}

export default FindPassword;