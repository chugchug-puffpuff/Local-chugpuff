import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko'; // 한국어 로케일 가져오기
import './CalendarComponent.css';
import axios from 'axios';

registerLocale('ko', ko); // 한국어 로케일 등록
setDefaultLocale('ko'); // 기본 로케일을 한국어로 설정

const localizer = momentLocalizer(moment);
// 캘린더 상단 커스텀
const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const goToToday = () => {
    toolbar.onNavigate('TODAY');
  };

  const label = () => {
    const date = moment(toolbar.date);
    return <p className="rbc-toolbar-text">{date.format('YYYY.MM')}</p>;
  };

  return (
    <div className="rbc-toolbar">
      {/* <span className="rbc-btn-group">
        <button type="button" onClick={goToToday}>Today</button>
      </span> */}
      <span className="rbc-toolbar-label">
        <img
          className="rbc-toolbar-img"
          alt="Arrow back"
          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668ccf4aa651ab8e54d23ff9/img/arrow-back-ios@2x.png"
          type="button" 
          onClick={goToBack}
        />
        {label()}
        <img
          className="rbc-toolbar-img"
          alt="Arrow forward"
          src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668ccf4aa651ab8e54d23ff9/img/arrow-forward-ios@2x.png"
          type="button" 
          onClick={goToNext}
        />
      </span>
    </div>
  );
};

// 캘린더 요일 커스텀
const CustomHeader = ({ label }) => {
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const isWeekend = weekDays.indexOf(label) === 0 || weekDays.indexOf(label) === 6; // 일요일(0) 또는 토요일(6)

  return (
    <div>
      <img
        className="Calendar-line-1"
        alt="Line"
        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2d9a0c1b9ea800c79d994/img/line-4.png"
      />
      <div className={`Calendar-daysText ${isWeekend ? 'blueText' : ''}`}>
        {label}
      </div>
      <img
        className="Calendar-line-2"
        alt="Line"
        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2d9a0c1b9ea800c79d994/img/line-4.png"
      />
      <img
        className="Calendar-line-3"
        alt="Line"
        src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/66c2d9a0c1b9ea800c79d994/img/line-4.png"
      />
    </div>
  );
};

const CalendarComponent = () => {
  const [addScheduleModal, setAddScheduleModal] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [schedule, setSchedule] = useState('');
  const [events, setEvents] = useState([
    // { start: new Date(2024, 9, 9), end: new Date(2024, 9, 9), title: '(주)네이처헬스\nwindow explanation 개발' }
  ]);
  // 일정 불러오기
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/calenders', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // 토큰을 헤더에 추가
          }
        });
        const data = await response.json();
        const mappedEvents = data.map(event => ({
          start: new Date(event.memoDate), 
          end: new Date(event.memoDate),
          title: event.memoContent
        }));
        setEvents(mappedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // const handleSelectSlot = ({ start, end }) => {
  //   const title = window.prompt('일정을 추가하세요');
  //   if (title) {
  //     setEvents([...events, { start, end, title }]);
  //   }
  // };

  const handleEventDelete = (eventToDelete) => {
    setEvents(events.filter(event => event !== eventToDelete));
  };

   // 일정 추가 함수
  const handleAddEvent = () => {
    const newEvent = {
        end: endDate,
        title: '새 일정',
    };
    setEvents([...events, newEvent]);
    setAddScheduleModal(false);
    setSchedule('');
  };

  return (
    <div>
      <p className="Calendar-text-wrapper">📆 치치폭폭으로 관리하는 취업 일정</p>
      <div className="Calendar-frame">
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 1200 }}
            selectable
            //onSelectSlot={handleSelectSlot}
            onSelectEvent={event => {
              if (window.confirm(`Delete the schedule: ${event.title}?`)) {
                handleEventDelete(event);
              }
            }}
            views={['month']}
            defaultView="month"
            formats={{
              monthHeaderFormat: (date, culture, localizer) =>
                localizer.format(date, 'YYYY.MM', culture),
              weekdayFormat: (date, culture, localizer) =>
                ['일', '월', '화', '수', '목', '금', '토'][date.getDay()],
              dayFormat: (date, culture, localizer) =>
                localizer.format(date, 'D', culture)
            }}
            components={{
              toolbar: CustomToolbar,
              header: CustomHeader
            }}
          />
          <div className="Calendar-add-frame" onClick={() => setAddScheduleModal(true)}>
            <div className="Calendar-add-text">일정 추가</div>
          </div>
        </div>
      </div>
      {addScheduleModal && (
        <div className="Schedule-frame-78">
          <div className="Schedule-frame-79">
            <div className="Schedule-frame-80">
              <div className="Schedule-text-wrapper-60">일정 추가</div>
              <p className="Schedule-dateAndSchedule">
                <div className='Schedule-text-frame'>
                  <DatePicker 
                    className="Schedule-text-wrapper-61" 
                    selected={endDate} 
                    onChange={date => setEndDate(date)}
                    locale="ko" // 한국어 로케일 설정
                    dateFormat="YYYY/MM/dd" // 날짜 형식을 숫자로 설정
                  />
                </div>
                <input
                  className="Schedule-text-field"
                  type="text"
                  value={schedule}
                  placeholder='일정을 입력하세요'
                  onChange={(e) => setSchedule(e.target.value)}
                />
              </p>
            </div>
            <div className="Schedule-frame-81">
              <div className="Schedule-frame-82" onClick={() => setAddScheduleModal(false)}>
                <div className="Schedule-text-wrapper-62">취소</div>
              </div>
              <div className="Schedule-frame-83" onClick={handleAddEvent}>
                <div className="Schedule-text-wrapper-63">추가</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;