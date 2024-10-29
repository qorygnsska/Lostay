import React, { useState } from 'react'

import { VscSettings } from "react-icons/vsc";
import { IoCheckmark } from "react-icons/io5";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function HotelFilter(props) {

  // 드롭다운
  const [selectedOption, setSelectedOption] = useState('평점 높은 순');

  const drop = [
    '평점 높은 순', '리뷰 많은 순', '낮은 가격 순', '높은 가격 순'
  ];
   
  const handleSelect = (eventKey) => {
   setSelectedOption(eventKey);
   props.callParent(eventKey);//1029JIP  HotelFilter(Comp) -> HotelList(Page) 값 전달
  };

  return (
    <div className='hotel--filter--container'>
        <div className='HotelFilter'>
        <div className='FilterBox'>
          <div className='SearchCount'>'{props.place}' 검색 결과 {props.resultCount}개</div>
          <div onClick={props.handleShow} className='FilterIcon'>
            <VscSettings /> 필터
          </div>
        </div>
        <div className='DropFilter'>
          <DropdownButton id="dropdown-basic-button" title={selectedOption} onSelect={handleSelect}>
            {drop.map(option => (
              <Dropdown.Item key={option} eventKey={option} className={selectedOption === option ? 'active' : ''}>
                <div className='DropBox'>
                  {option}
                  {selectedOption === option && <IoCheckmark id='check'/>} 
                </div>
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
      </div>
    </div>
  )
}
