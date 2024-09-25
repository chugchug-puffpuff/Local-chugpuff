import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarComponent.css';

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
  const [events, setEvents] = useState([
    { start: new Date(2024, 9, 2), end: new Date(2024, 9, 2), title: '(주)네이처헬스\nwindow explanation 개발' },
    { start: new Date(2024, 9, 9), end: new Date(2024, 9, 9), title: '(주)네이처헬스\nwindow explanation 개발' },
    { start: new Date(2024, 9, 17), end: new Date(2024, 9, 17), title: '(주)네이처헬스\nwindow explanation 개발' },
    { start: new Date(2024, 9, 30), end: new Date(2024, 9, 30), title: '(주)네이처헬스\nwindow explanation 개발' },
    // 추가 이벤트를 여기에 정의
  ]);

  // const handleSelectSlot = ({ start, end }) => {
  //   const title = window.prompt('일정을 추가하세요');
  //   if (title) {
  //     setEvents([...events, { start, end, title }]);
  //   }
  // };

  // const handleEventDelete = (eventToDelete) => {
  //   setEvents(events.filter(event => event !== eventToDelete));
  // };

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
            // onSelectSlot={handleSelectSlot}
            // onSelectEvent={event => {
            //   if (window.confirm(`Delete the schedule: ${event.title}?`)) {
            //     handleEventDelete(event);
            //   }
            // }}
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
          <div className="Calendar-add-frame">
            <div className="Calendar-add-text">일정 추가</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;