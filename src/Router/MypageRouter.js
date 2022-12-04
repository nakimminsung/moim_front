import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Mypage from '../pages/mypage/Mypage';

function MypageRouter() {
    return (
        <>
            <Routes>
                {/* mypage 레이아웃을 적용받을 js 페이지 */}
                <Route path='' element={<Mypage />} />
            </Routes>
        </>
    );
}

export default MypageRouter;
