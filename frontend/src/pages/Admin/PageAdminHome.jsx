import React, { useEffect, useState } from 'react';
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin';
import { Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { adminPrivateApi } from '../../api/adminApi';

// 스케일 등록
Chart.register(...registerables);

export default function PageAdminHome() {


  // ==================== START ======================== //
  // 데이터 가져오기
  const getData = async () => {
    try {
      const yearChartResp = await adminPrivateApi.get('http://localhost:9090/admin/revenueYearChart');
      setYearChart(yearChartResp.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  // 데이터 가져오기
  // ==================== END ======================== //


  // ==================== START ======================== //
  // 년도별 중개료, 예약건수
  const [yearChart, setYearChart] = useState([]);
  const [yearLabel, setYearLabel] = useState([]);
  const [yearTotalCommissionData, setYearTotalCommissionData] = useState([]);
  const [yearTotalReservationsData, setYearTotalReservationsData] = useState([]);
  const [totalCommission, setTotalCommission] = useState('')
  const [totalReservations, setTotalReservations] = useState('')

  useEffect(() => {
    if (yearChart.length > 0) {
      const labels = yearChart.map(data => `${data.year}`);
      const totalCommissionData = yearChart.map(data => data.totalCommission);
      const totalReservationsData = yearChart.map(data => data.totalReservations);

      // 총합 계산
      setTotalCommission(totalCommissionData.reduce((acc, curr) => acc + curr, 0));
      setTotalReservations(totalReservationsData.reduce((acc, curr) => acc + curr, 0));

      setYearLabel(labels);
      setYearTotalCommissionData(totalCommissionData);
      setYearTotalReservationsData(totalReservationsData);
    }
  }, [yearChart]);


  const yearData = {
    labels: yearLabel,
    datasets: [
      {
        type: 'bar',
        label: '중개료',
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235)', // 배경색 추가
        borderWidth: 2,
        data: yearTotalCommissionData,
        yAxisID: 'y1',
        barPercentage: 0.4, // 막대 폭 조정
        categoryPercentage: 0.5, // 카테고리의 막대 폭 조정
      },
      {
        type: 'bar',
        label: '예약건수',
        backgroundColor: 'rgba(255, 99, 132)', // 배경색 추가
        data: yearTotalReservationsData,
        borderColor: 'red',
        borderWidth: 2,
        yAxisID: 'y2',
        barPercentage: 0.4, // 막대 폭 조정
        categoryPercentage: 0.5, // 카테고리의 막대 폭 조정
      }
    ],
  };

  const options = {
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


  return (
    <>
      <div className='page--admin--home--container page--admin'>
        <CompHeaderAdmin />

        <div className='year--wrap'>

          <div className='year--total'>
            <div className='year--title'>
              총 중개료 / 총 예약 건수
            </div>
            <div className='year--total--box'>
              <ul>
                <li className='commossion--box'>
                  <div>중개료</div>
                  <div>{totalCommission.toLocaleString()}원</div>
                </li>

                <li className='reservation--box'>
                  <div>예약검수</div>
                  <div>{totalReservations.toLocaleString()}건</div>
                </li>
              </ul>

            </div>

          </div>
          <div className='year--chart--box'> {/* 막대 그래프를 감싸는 DIV */}
            <div className='year--title'>
              총 중개료 /총 예약건수
            </div>
            <div className='year--chart'>
              <Bar data={yearData} options={options} /> {/* Bar 컴포넌트 사용 */}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
