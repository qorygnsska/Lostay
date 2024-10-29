import React, { useState } from 'react'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { CiRedo } from "react-icons/ci";

import Form from 'react-bootstrap/Form';
import { Range } from 'react-range'; // 슬라이더

export default function HotelModal({props, show, handleClose, callParent}) {


  // 스위치(매진 숙소 제외)
  const [isSoldOutExcluded, setIsSoldOutExcluded] = useState(false);
  // const handleSwitchChange = (e) => {  //1029JIP: 인라인으로 작성
  //   setIsSoldOutExcluded(e.target.checked);
  // };

  // 슬라이더(최소-최대 가격)
  const [minValue, setMinValue] = useState(0); // 초기 최소값
  const [maxValue, setMaxValue] = useState(500000); // 초기 최대값

  // 버튼 췍(할인혜택, 등급, 공용시설, 기타시설 한번에)
  const [activeButtons, setActiveButtons] = useState([]);

  // 버튼
  const rankBtn = ['5성급', '4성급', '블랙', '리조트', '가족호텔'];
  const publicBtn = [
    '사우나', '수영장', '레스토랑', '라운지', '피트니스',
    '골프장', '엘리베이터', '공용PC', '바베큐', '카페',
    '공용스파', '편의점', '노래방', '주방/식당', '세탁기',
    '건조기', '탈수기', '주차장', '취사가능', '공용샤워실',
    '온천', '스키장'
  ];
  const otherBtn = [
    '조식제공', '무료주차', '객실내취사', '반려견동반',
    '객실내흡연', '발렛파킹', '금연', '프린터사용',
    '짐보관가능', '픽업서비스', '캠프파이어', '카드결제',
    '장애인편의'
  ];

  //버튼 클릭시 activeButtons 배열에 차곡차곡 담아서,,,
  const handleButtonClick = (name) => {
    if (activeButtons.includes(name)) {
      // 이미 선택된 버튼 클릭 시 비활성화
      setActiveButtons(activeButtons.filter(button => button !== name));
    } else {
      // 새로운 버튼 클릭 시 활성화
      setActiveButtons([...activeButtons, name]);
    }
  };


  // '적용' 버튼
  const filterHandler = () => {
    //값들 모두 HotelModal(Comp) -> HotelList(Page) 전달
    callParent(isSoldOutExcluded, minValue, maxValue, activeButtons);


    //모달 닫기
    handleClose();
  }

  // 초기화
  const handleReset = () => {
    setMinValue(0);
    setMaxValue(1000000);
    setActiveButtons([]);
    setIsSoldOutExcluded(false);
  };


  return (
    <div className='hotel--modal--container'>
        <Modal show={show} onHide={handleClose} keyboard={false} scrollable={true} className='hotel--list--Filter'
        {...props}
        size='lg'
      >
        <Modal.Header className='FilterHead'>
          <Modal.Title>필터</Modal.Title>
          <div className='FilterReset' onClick={handleReset}>초기화<CiRedo /></div>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '75vh' }}>
          <Form>
            <div className='SoldOutF border-bottom pb-3 mb-3 d-flex'>
              <span className='RoomExclude'>매진 숙소 제외</span>
              <Form.Check type="switch" id="custom-switch" checked={isSoldOutExcluded} onChange={()=>setIsSoldOutExcluded(!isSoldOutExcluded)}/>
              {/* checked={isSoldOutExcluded} onChange={handleSwitchChange} -> onChange 1029JIP 변경*/}
            </div>

            <div className='PriceF border-bottom pb-3 mb-3'>
              <Form.Label>
                가격: {minValue.toLocaleString()}원 - {maxValue.toLocaleString()}원
              </Form.Label>

              <Range
                step={50000}
                min={0} // 슬라이더 최소값 (왼쪽 슬라이더)
                max={500000} // 슬라이더 최대값 (오른쪽 슬라이더)
                values={[minValue, maxValue]} // 현재 값 배열
                onChange={(values) => {
                  const newMin = Math.max(values[0], 0); // 최소값은 0으로 제한
                  const newMax = Math.min(values[1], 500000); // 최대값은 500,000으로 제한

                  // 왼쪽 슬라이더는 오른쪽 슬라이더보다 50,000 작게 설정
                  if (newMax - 50000 >= newMin) {
                    setMinValue(newMin); // 왼쪽 슬라이더 값 업데이트
                    setMaxValue(newMax); // 오른쪽 슬라이더 값 업데이트
                  }
                }}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      height: '6px',
                      width: '100%',
                      backgroundColor: '#ddd',
                      position: 'relative'
                    }}
                  >
                    {/* 핸들 사이의 바 색상 */}
                    <div
                      style={{
                        position: 'absolute',
                        height: '6px',
                        left: `${(minValue / 500000) * 100}%`, // 왼쪽 핸들의 위치
                        right: `${(500000 - maxValue) / 500000 * 100}%`, // 오른쪽 핸들의 위치
                        backgroundColor: '#007bff',
                        transition: 'left 0.2s ease, right 0.2s ease'

                      }}
                    />
                    {children} {/* 슬라이더 핸들 */}
                  </div>
                )}
                renderThumb={({ props, index }) => (
                  <div
                    {...props}
                    style={{
                      height: '16px',
                      width: '16px',
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      position: 'absolute',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                  </div>
                )}
              />

            </div>
            <div className='EventF border-bottom pb-3 mb-3'>
              <p>할인혜택</p>
              <input type='button' value='할인특가' key='할인특가' name='할인특가' className='BtnF' id='할인특가'
                  onClick={() => handleButtonClick('할인특가')}
                  style={{
                    backgroundColor: activeButtons.includes('할인특가') ? 'rgb(237, 247, 255)' : '',
                    color: activeButtons.includes('할인특가') ? 'rgb(0, 83, 192)' : '',
                    border: activeButtons.includes('할인특가') ? '1px solid rgb(167, 215, 255)' : ''
                  }}
                />
            </div>

            <div className='RankF border-bottom pb-3 mb-3'>
              <p>등급</p>
              {rankBtn.map(name => (
                <input type='button' value={name} key={name} name={name} className='BtnF' id={name}
                onClick={() => handleButtonClick(name)}
                style={{
                  backgroundColor: activeButtons.includes(name) ? 'rgb(237, 247, 255)' : '',
                  color: activeButtons.includes(name) ? 'rgb(0, 83, 192)' : '',
                  border: activeButtons.includes(name) ? '1px solid rgb(167, 215, 255)' : ''
                }}
              />
              ))}
            </div>

            <div className='PublicF border-bottom pb-3 mb-3'>
              <p>공용시설</p>
              {publicBtn.map(name => (
                <input type='button' value={name} key={name} name={name} className='BtnF' id={name}
                onClick={() => handleButtonClick(name)}
                style={{
                  backgroundColor: activeButtons.includes(name) ? 'rgb(237, 247, 255)' : '',
                  color: activeButtons.includes(name) ? 'rgb(0, 83, 192)' : '',
                  border: activeButtons.includes(name) ? '1px solid rgb(167, 215, 255)' : ''
                }}
              />
              ))}
            </div>

            <div className='OtherF'>
              <p>기타 시설</p>
              {otherBtn.map(name => (
                <input type='button' value={name} key={name} name={name} className='BtnF' id={name}
                onClick={() => handleButtonClick(name)}
                style={{
                  backgroundColor: activeButtons.includes(name) ? 'rgb(237, 247, 255)' : '',
                  color: activeButtons.includes(name) ? 'rgb(0, 83, 192)' : '',
                  border: activeButtons.includes(name) ? '1px solid rgb(167, 215, 255)' : ''
                }}
              />
              ))}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>닫기</Button>
          <Button variant="primary" onClick={filterHandler}>적용</Button>
        </Modal.Footer>                      
      </Modal>
    </div>
  )
}
