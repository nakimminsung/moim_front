import React, { useEffect, useState } from 'react';
import { Person } from '@material-ui/icons';
import axios from 'axios';
import RoomIcon from '@material-ui/icons/Room';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import qs from "query-string";
//통합검색
function Search() {
    // 쿼리스트링으로 넘어오는 인자를 받기위해 useLocation 사용
    const searchParams = useLocation().search;
    // location의 search에 쿼리스트링 내용 담겨있음(?searchWord=)
    const query = qs.parse(searchParams);
    // const { searchWord } = location.search;
    const searchWord = new URLSearchParams(searchParams).get('searchWord');
    const [roomData, setRoomData] = useState([]);
    const [sort, setSort] = useState('a.readCount desc');

    const navi = useNavigate(); //공간 클릭 시 상세페이지로 이동

    const getSpaceList = () => {
        let url =
            localStorage.url +
            '/searchroom' +
            '?searchWord=' +
            searchWord +
            '&sort=' +
            sort;

        // console.log(searchWord);
        // console.log(url);

        axios.get(url).then((res) => setRoomData(res.data));
    };

    useEffect(() => {
        //방 리스트
        getSpaceList();
    }, [sort, searchWord]);

    return (
        <div>
            <div
                className='spaceList'
                style={{
                    marginTop: '10px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                }}
            >
                {roomData &&
                    roomData.map((data, idx) => (
                        <div
                            style={{
                                border: '1px solid lightgray',
                                borderRadius: '5px',
                                // width: '300px',
                                // marginRight: '2%',
                                cursor: 'pointer',

                                marginBottom: '30px',
                                backgroundColor: 'white',
                                boxShadow: '0px 2px 2px 1px rgba(0 0 0 / 10%)',

                                width: '23%',
                                // height: '100%',
                                margin: '1%',
                            }}
                            key={idx}
                            onClick={() => {
                                navi('/detail/' + data.num);
                            }}
                        >
                            <img
                                alt=''
                                src={data.thumbnailImage}
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    // height: '70%',
                                    borderRadius: '5px',
                                }}
                            />
                            <br />
                            <div style={{ color: 'gray' }}>
                                <h5>
                                    <b style={{ color: 'black' }}>{data.name}</b>
                                </h5>
                                <span>
                                    <RoomIcon
                                        style={{
                                            fontSize: '20px',
                                            marginBottom: '5px',
                                        }}
                                    />
                                    {/* {data.address.split(' ')[1]} */}
                                </span>
                                <br />
                                <span>room tag list</span>
                                <br />
                                <span>
                                    <b
                                        style={{
                                            color: '#6f42c1',
                                            fontSize: '20px',
                                        }}
                                    >
                                        {data.weekAmPrice.toLocaleString(
                                            'ko-KR',
                                        )}
                                    </b>
                                    &nbsp;원 / 시간
                                </span>
                                &emsp;&emsp;
                                <span>
                                    <Person style={{ fontSize: '20px' }} /> 최대{' '}
                                    {data.headcount}인
                                </span>
                                <br />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Search;