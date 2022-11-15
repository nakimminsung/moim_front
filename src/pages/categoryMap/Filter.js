import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

function valuetext(value) {
    return `${value}°C`;
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Filter(props) {
    const [data, setData] = useState([]);
    const [value, setValue] = useState([0, 100000000]);
    const selectFacility = () => {
        let url = localStorage.url + '/facility/select';
        axios.get(url).then((res) => setData(res.data));
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        selectFacility();
    }, []);

    return (
        <Wrapper>
            <InnerWrapper>
                <PayTitleWrapper>
                    <Title>결제유형</Title>
                    <Typography>
                        <Checkbox {...label} defaultChecked color='secondary' />
                        모든결제
                    </Typography>
                </PayTitleWrapper>
                <PayButtonWrapper>
                    <div class='pay-btn'>
                        <input
                            id='radio-1'
                            type='radio'
                            name='pay'
                            value='now'
                        />
                        <label for='radio-1'>바로 결제</label>
                    </div>
                    <div class='pay-btn'>
                        <input
                            id='radio-2'
                            type='radio'
                            name='pay'
                            value='fix'
                        />
                        <label for='radio-2'>승인 결제</label>
                    </div>
                </PayButtonWrapper>
            </InnerWrapper>
            <InnerWrapper>
                <Title>가격</Title>
                <Box
                    sx={{
                        width: '93%',
                        margin: '10px',
                    }}
                >
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay='auto'
                        getAriaValueText={valuetext}
                        style={{ color: '#9b4de3' }}
                        step={10000}
                        max={1000000}
                    />
                </Box>
            </InnerWrapper>
            <InnerWrapper>
                <Title>퍼실리티</Title>
                <Option>
                    {data &&
                        data.map((item, i) => (
                            <div class='facility-btn'>
                                <input
                                    id={`facility-${item.num}`}
                                    type='checkbox'
                                    name='facility'
                                    value={item.num}
                                />
                                <label for={`facility-${item.num}`}>
                                    {item.fname}
                                </label>
                            </div>
                        ))}
                </Option>
            </InnerWrapper>
            <ButtonWrapper>
                <CancelButton variant='secondary'>초기화</CancelButton>
                <SubmitButton variant='secondary'>필터 적용하기</SubmitButton>
            </ButtonWrapper>
        </Wrapper>
    );
}

export default Filter;

const list = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const Wrapper = styled(Box)`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   width: 350px;
   height: 600px;
`;
const InnerWrapper = styled(Box)`
   width: 100%;
   display: flex;
   flex-direction: column;
   padding: 20px;
`;
const PayTitleWrapper = styled(Box)`
   display: flex;
   justify-content: space-between;
   margin-bottom: 10px;
   align-items: center;
`;
const Title = styled(Typography)`
   font-size: 20px;
   margin-bottom: 10px;
`;
const PayButtonWrapper = styled(Box)`
   width: 100%;
   display: flex;
   justify-content: space-between;
`;
const Option = styled(Box)`
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   overflow: auto;
   max-height: 300px;
`;
const ButtonWrapper = styled(Box)`
   position: relative;
   bottom: 0;
   width: 100%;
   display: flex;
   justify-content: space-between;
`;
const CancelButton = styled(Button)`
   background-color: #f0f0f0;
   width: 30%;
   border-radius: 0;
   height: 60px;
   font-size: 20px;
`;
const SubmitButton = styled(Button)`
   background-color: #9b4de3;
   width: 70%;
   border-radius: 0;
   height: 60px;
   font-size: 20px;
   color: yellow;
   :hover {
      color: #9b4de3;
   }
`;