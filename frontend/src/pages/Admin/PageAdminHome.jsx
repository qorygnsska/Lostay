import React, { useEffect, useState } from 'react';
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin';
import { FaSquare } from "react-icons/fa";
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { adminPrivateApi } from '../../api/adminApi';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// 스케일 등록
Chart.register(...registerables);

export default function PageAdminHome() {

  /////////////////////////////////////////////////////////////////LoginState
  const navigate = useNavigate();
  const adminState = useSelector((state) => state.admin.adminState);
  const adminAT = useSelector((state) => state.admin.adminAT)

  useEffect(() => {

    if (adminState === false) {
      alert('접근이 불가능합니다.');
      navigate("/admin-login");
    } else {
      //console.log('AccessToken: ' + adminAT);
    }
  }, []);
  /////////////////////////////////////////////////////////////////LoginState

  // ==================== START ======================== //
  // 드롭 다운
  const startYear = 2023;
  const currentYear = new Date().getFullYear(); // 현재 년도 가져오기
  const setYear = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i).reverse();

  const [selectedYear, setSelectedYear] = useState(setYear[0]);

  const handleSelect = (eventKey) => {
    setSelectedYear(setYear[eventKey]);

  };
  // 드롭 다운
  // ==================== END ======================== //

  // ==================== START ======================== //
  // 데이터 가져오기
  // 년도별 데이터
  const getData = async () => {
    try {
      const [yearChartResp, branchChartResp, monthChartResp] = await Promise.all([
        adminPrivateApi.get('/admin/revenueYearChart'),
        adminPrivateApi.get(`/admin/revenuebranchChart?year=${selectedYear}`),
        adminPrivateApi.get(`/admin/revenueMonthChart?year=${selectedYear}`),

      ])

      setYearChart(yearChartResp.data);
      setBranchChart(branchChartResp.data);
      setMonthChart(monthChartResp.data);
      console.log(monthChartResp.data)

    } catch (error) {
      console.error(error);
    }
  };


  // 월별, 분기별 데이터 가져오기

  const getMonthandBranchChartData = async (selectedYear) => {
    try {
      const [branchChartResp, monthChartResp] = await Promise.all([
        adminPrivateApi.get(`/admin/revenuebranchChart?year=${selectedYear}`),
        adminPrivateApi.get(`/admin/revenueMonthChart?year=${selectedYear}`),

      ]);

      setBranchChart(branchChartResp.data);
      setMonthChart(monthChartResp.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getMonthandBranchChartData(selectedYear);
  }, [selectedYear]);

  // 데이터 가져오기
  // ==================== END ======================== //


  // ==================== START ======================== //
  // 년도별 중개료, 예약건수
  const [yearChart, setYearChart] = useState([]);
  const [yearLabel, setYearLabel] = useState([]);
  const [totalYearCommission, setTotalYearCommission] = useState('')
  const [totalYearReservations, setTotalYearReservations] = useState('')
  const [totalYearCommissionData, setTotalYearCommissionData] = useState([]);
  const [totalYearReservationsData, setTotalYearReservationsData] = useState([]);


  useEffect(() => {
    if (yearChart.length > 0) {
      const labels = yearChart.map(data => `${data.year}년`);
      const totalCommissionData = yearChart.map(data => data.totalCommission);
      const totalReservationsData = yearChart.map(data => data.totalReservations);

      // 총합 계산
      setTotalYearCommission(totalCommissionData.reduce((acc, curr) => acc + curr, 0));
      setTotalYearReservations(totalReservationsData.reduce((acc, curr) => acc + curr, 0));
      console.log(totalCommissionData)
      setYearLabel(labels);
      setTotalYearCommissionData(totalCommissionData);
      setTotalYearReservationsData(totalReservationsData);
    }
  }, [yearChart]);


  const yearData = {
    labels: yearLabel,
    datasets: [
      {
        type: 'bar',
        label: '총 중개료',
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235)', // 배경색 추가
        borderWidth: 2,
        data: totalYearCommissionData,
        yAxisID: 'y1',
        barPercentage: 0.4, // 막대 폭 조정
        categoryPercentage: 0.5, // 카테고리의 막대 폭 조정
      },
      {
        type: 'bar',
        label: '총 예약건수',
        backgroundColor: 'rgba(255, 99, 132)', // 배경색 추가
        data: totalYearReservationsData,
        borderColor: 'red',
        borderWidth: 2,
        yAxisID: 'y2',
        barPercentage: 0.4, // 막대 폭 조정
        categoryPercentage: 0.5, // 카테고리의 막대 폭 조정
      }
    ],
  };

  const yearOptions = {
    scales: {
      y1: {
        type: 'linear',
        position: 'left',
        beginAtZero: true,
        ticks: {
          stepSize: 100000, // 세분화된 눈금 간격 설정
          callback: function (value) {
            return value.toLocaleString(); // 숫자에 천 단위 구분 기호 추가
          }
        }
      },
      y2: {
        type: 'linear',
        position: 'right',
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10, // 예약 수는 1단위로 세분화
          callback: function (value) {
            return value.toLocaleString(); // 숫자에 천 단위 구분 기호 추가
          }
        },
        grid: {
          drawOnChartArea: false, // 오른쪽 Y축의 그리드 라인 비활성화
        }
      }
    }
  };
  // 년도별 중개료, 예약건수
  // ==================== END ======================== //


  // ==================== START ======================== //
  // 분기별 중개료, 예약건수
  const [branchChart, setBranchChart] = useState([]);
  const [branchLabel, setBranchLabel] = useState([]);
  const [totalBranchCommission, setTotalBranchCommission] = useState('')
  const [totalBranchReservations, setTotalBranchReservations] = useState('')
  const [totalBranchCommissionData, setTotalBranchCommissionData] = useState([]);
  const [totalBranchReservationsData, setTotalBranchReservationsData] = useState([]);

  useEffect(() => {
    if (branchChart.length > 0) {
      const labels = branchChart.map(data => `${data.branch}분기`);
      const totalCommissionData = branchChart.map(data => data.totalCommission);
      const totalReservationsData = branchChart.map(data => data.totalReservations);

      // 총합 계산
      setTotalBranchCommission(totalCommissionData.reduce((acc, curr) => acc + curr, 0));
      setTotalBranchReservations(totalReservationsData.reduce((acc, curr) => acc + curr, 0));

      setBranchLabel(labels);
      setTotalBranchCommissionData(totalCommissionData);
      setTotalBranchReservationsData(totalReservationsData);
    }
  }, [branchChart]);


  const branchData = {
    labels: branchLabel,
    datasets: [
      {
        type: 'line',
        label: '분기별 중개료',
        borderColor: 'rgb(54, 162, 235)',
        data: totalBranchCommissionData,
        yAxisID: 'y1',
      },
      {
        type: 'line',
        label: '분기별 예약수',
        borderColor: 'rgba(255, 99, 132)',
        data: totalBranchReservationsData,
        yAxisID: 'y2',
      }
    ],
  };

  const branchOptions = {
    scales: {
      y1: {
        type: 'linear',
        position: 'left',
        beginAtZero: true,
        ticks: {
          stepSize: 100000, // 세분화된 눈금 간격 설정
          callback: function (value) {
            return value.toLocaleString(); // 숫자에 천 단위 구분 기호 추가
          }
        }
      },
      y2: {
        type: 'linear',
        position: 'right',
        beginAtZero: true,
        max: 50,
        ticks: {
          stepSize: 1, // 세분화된 눈금 간격 설정
          callback: function (value) {
            return value.toLocaleString(); // 숫자에 천 단위 구분 기호 추가
          }
        }
      }
    }
  };

  // 분기별 중개료, 예약건수
  // ==================== END ======================== //


  // ==================== START ======================== //
  // 월별 중개료, 예약건수
  const [monthChart, setMonthChart] = useState([]);
  const [monthLabel, setMonthLabel] = useState([]);
  const [totalMonthCommission, setTotalMonthCommission] = useState('')
  const [totalMonthReservations, setTotalMonthReservations] = useState('')
  const [totalMonthCommissionData, setTotalMonthCommissionData] = useState([]);
  const [totalMonthReservationsData, setTotalMonthReservationsData] = useState([]);


  useEffect(() => {
    if (monthChart.length > 0) {
      const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1부터 12까지 배열 생성

      // 월별 데이터 초기화 및 monthChart에서 데이터 업데이트
      const initialData = months.map(month => {
        const foundData = monthChart.find(data => data.month === String(month)) || {}; // 해당 월의 데이터 찾기
        return {
          month,
          totalCommission: foundData.totalCommission || 0, // 데이터가 없으면 0으로 설정
          totalReservations: foundData.totalReservations || 0,
        };
      });

      const labels = initialData.map(data => `${data.month}월`);
      const totalCommissionData = initialData.map(data => data.totalCommission);
      const totalReservationsData = initialData.map(data => data.totalReservations);
      // const labels = monthChart.map(data => `${data.month}월`);
      // const totalCommissionData = monthChart.map(data => data.totalCommission);
      // const totalReservationsData = monthChart.map(data => data.totalReservations);

      // // 총합 계산
      setTotalMonthCommission(totalCommissionData.reduce((acc, curr) => acc + curr, 0));
      setTotalMonthReservations(totalReservationsData.reduce((acc, curr) => acc + curr, 0));
      // console.log(totalCommissionData)
      setMonthLabel(labels);
      setTotalMonthCommissionData(totalCommissionData);
      setTotalMonthReservationsData(totalReservationsData);
    }
  }, [monthChart]);


  const monthData = {
    labels: monthLabel,
    datasets: [
      {
        type: 'bar',
        label: '월별 중개료',
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235)', // 배경색 추가
        borderWidth: 2,
        data: totalMonthCommissionData,
        yAxisID: 'y1',

      },
      {
        type: 'bar',
        label: '월별 예약건수',
        backgroundColor: 'rgba(255, 99, 132)', // 배경색 추가
        data: totalMonthReservationsData,
        borderColor: 'red',
        borderWidth: 2,
        yAxisID: 'y2',

      }
    ],
  };

  const monthOptions = {
    scales: {
      y1: {
        type: 'linear',
        position: 'left',
        beginAtZero: true,
        ticks: {
          stepSize: 100000, // 세분화된 눈금 간격 설정
          callback: function (value) {
            return value.toLocaleString(); // 숫자에 천 단위 구분 기호 추가
          }
        }
      },
      y2: {
        type: 'linear',
        position: 'right',
        beginAtZero: true,
        max: 50,
        ticks: {
          stepSize: 1, // 예약 수는 1단위로 세분화
          callback: function (value) {
            return value.toLocaleString(); // 숫자에 천 단위 구분 기호 추가
          }
        },
        grid: {
          drawOnChartArea: false, // 오른쪽 Y축의 그리드 라인 비활성화
        }
      }
    }
  };

  // 월별 중개료, 예약건수
  // ==================== END ======================== //


  return (
    <>
      <div className='page--admin--home--container page--admin'>
        <CompHeaderAdmin />

        <div className='select--wrap'>
          <div className='select--total'>
            <div className='select--title'>
              총 중개료 / 예약 건수
            </div>
            <div className='select--total--box'>
              <ul>
                <li className='commossion--box'>
                  <div className='info--title'><FaSquare className='commossion--icon' />중개료</div>
                  <div className='info'>총 <span className='commossion'>{totalYearCommission.toLocaleString()}</span>원</div>
                </li>

                <li className='reservation--box'>
                  <div className='info--title'><FaSquare className='reservation--icon' />예약검수</div>
                  <div className='info'>총 <span className='reservation'>{totalYearReservations.toLocaleString()}</span>건</div>
                </li>
              </ul>

            </div>

          </div>
          <div className='select--chart--box'> {/* 막대 그래프를 감싸는 DIV */}
            <div className='chart'>
              <Bar data={yearData} options={yearOptions} /> {/* Bar 컴포넌트 사용 */}
            </div>
          </div>
        </div>


        {/* 분기별 */}
        <div className='select--wrap'>
          <div className='select--total'>
            <div className='select--title'>
              분기별 중개료 / 예약 건수
            </div>
            <div className='select--total--box'>
              <ul>
                <li>
                  <div className='selYear'>{selectedYear}년</div>
                </li>

                <li className='commossion--box'>
                  <div className='info--title'><FaSquare className='commossion--icon' />중개료 ({totalBranchCommission.toLocaleString()}원)</div>
                  <div className='branch--info'>
                    {totalBranchCommissionData &&
                      totalBranchCommissionData.map((data, index) => (
                        <div className='info' key={index}>
                          <span>{index + 1}분기 : {data.toLocaleString()}원</span>
                        </div>
                      ))

                    }
                  </div>

                </li>

                <li className='reservation--box'>
                  <div className='info--title'><FaSquare className='reservation--icon' />예약건수 ({totalBranchReservations.toLocaleString()}건)</div>
                  <div className='branch--info'>
                    {totalBranchReservationsData &&
                      totalBranchReservationsData.map((data, index) => (
                        <div className='info' key={index}>
                          <span>{index + 1}분기 : {data.toLocaleString()}건</span>
                        </div>
                      ))

                    }
                  </div>

                </li>
              </ul>
            </div>
          </div>
          <div className='select--chart--box'> {/* 막대 그래프를 감싸는 DIV */}
            <div className="dropdown--box">
              <Dropdown onSelect={handleSelect} className="dropdown">
                <Dropdown.Toggle>{selectedYear}년</Dropdown.Toggle>

                <Dropdown.Menu className="dropdown--menu">
                  {setYear.map((yearVal, idx) => (
                    <Dropdown.Item key={idx} eventKey={idx}>
                      {yearVal}년
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className='chart'>
              <Line data={branchData} options={branchOptions} /> {/* Bar 컴포넌트 사용 */}
            </div>
          </div>
        </div>


        {/* 월별 */}
        <div className='select--wrap'>
          <div className='select--total'>
            <div className='select--title'>
              월별 중개료 / 예약 건수
            </div>
            <div className='select--total--box'>
              <ul>
                <li>
                  <div className='selYear'>{selectedYear}년</div>
                </li>

                <li className='commossion--box'>
                  <div className='info--title'><FaSquare className='commossion--icon' />중개료 ({totalMonthCommission.toLocaleString()}원)</div>
                  <div className='branch--info'>
                    {totalMonthCommissionData &&
                      totalMonthCommissionData.map((data, index) => (
                        <div className='info'>
                          <span>{index + 1}분기 : {data.toLocaleString()}원</span>
                        </div>
                      ))

                    }
                  </div>
                </li>

                <li className='reservation--box'>
                  <div className='info--title'><FaSquare className='reservation--icon' />예약건수 ({totalMonthReservations.toLocaleString()}건)</div>
                  <div className='branch--info'>
                    {totalMonthReservationsData &&
                      totalMonthReservationsData.map((data, index) => (
                        <div className='info' key={index}>
                          <span>{index + 1}월 : {data.toLocaleString()}건</span>
                        </div>
                      ))

                    }
                  </div>

                </li>
              </ul>

            </div>
          </div>
          <div className='select--chart--box'> {/* 막대 그래프를 감싸는 DIV */}
            <div className="dropdown--box">
              <Dropdown onSelect={handleSelect} className="dropdown">
                <Dropdown.Toggle>{selectedYear}년</Dropdown.Toggle>

                <Dropdown.Menu className="dropdown--menu">
                  {setYear.map((yearVal, idx) => (
                    <Dropdown.Item key={idx} eventKey={idx}>
                      {yearVal}년
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className='chart'>
              <Bar data={monthData} options={monthOptions} /> {/* Bar 컴포넌트 사용 */}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
