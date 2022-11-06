import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import List1 from './pages/List1';
import List2 from './pages/List2';

function RouterMain() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu1/list" element={<List1 />} />
        <Route path="/menu2">
          <Route path="list" element={<List2 />} />
        </Route>
        <Route
          path="*"
          element={
            <div>
              <h1>잘못된 URL 주소입니다</h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default RouterMain;
