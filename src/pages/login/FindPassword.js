import { Button } from '@mui/material';
import React from 'react';

function FindPassword(props) {


    return (
        <div>
            {/* <a>아이디 / 비밀번호 찾기</a> */}
            <Button variant="outlined" style={{ marginTop: '5px' }}
            >아이디/비밀번호 찾기</Button>

        </div>
    );
}

export default FindPassword;