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
import { Link } from 'react-router-dom';

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
  const [scheduleCheckModal, setScheduleCheckModal] = useState(false); // 일정 확인 모달창 상태
  const [selectedEvent, setSelectedEvent] = useState(null); // 선택된 이벤트 상태 추가
  const [addScheduleModal, setAddScheduleModal] = useState(false); // 일정 등록 모달창 상태
  const [editScheduleModal, setEditScheduleModal] = useState(false); // 일정 수정 모달창 상태
  const [endDate, setEndDate] = useState(new Date());
  const [schedule, setSchedule] = useState('');
  const [events, setEvents] = useState([]);

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
          memoNo: event.memoNo,
          start: new Date(event.memoDate), 
          end: new Date(event.memoDate),
          title: event.memoContent,
          jobId: event.scrap?.jobId || null
        }));
        setEvents(mappedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

   // 일정 추가 함수
  const handleAddEvent = async () => {
    const newEvent = {
      end: endDate,
      title: schedule,
    };
  
    try {
      await axios.post('http://localhost:8080/api/calenders', {
        memoDate: endDate.toISOString().split('T')[0],
        memoContent: schedule,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEvents([...events, newEvent]); // 일정 추가 후 바로 업데이트
      setAddScheduleModal(false);
      setSchedule('');
      // 일정 추가 후 일정 다시 불러오기
      const fetchEvents = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/calenders', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await response.json();
          const mappedEvents = data.map(event => ({
            start: new Date(event.memoDate),
            end: new Date(event.memoDate),
            title: event.memoContent,
            jobId: event.scrap?.jobId || null
          }));
          setEvents(mappedEvents);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };

      fetchEvents();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  useEffect(() => {
    if (editScheduleModal && selectedEvent) {
      setEndDate(new Date(selectedEvent.end));
    }
  }, [editScheduleModal, selectedEvent]);

  // 일정 수정 함수
  const handleEditEvent = async () => {
    const updatedEvent = {
      memoDate: endDate.toISOString().split('T')[0],
      memoContent: schedule,
    };
  
    try {
      await axios.put(`http://localhost:8080/api/calenders/${selectedEvent.memoNo}`, updatedEvent, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      // 일정 수정 후 일정 다시 불러오기
      const fetchEvents = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/calenders', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await response.json();
          const mappedEvents = data.map(event => ({
            memoNo: event.memoNo,
            start: new Date(event.memoDate),
            end: new Date(event.memoDate),
            title: event.memoContent,
            jobId: event.scrap?.jobId || null
          }));
          setEvents(mappedEvents);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
  
      await fetchEvents(); // fetchEvents를 호출하여 상태 업데이트
      setEditScheduleModal(false);
      setScheduleCheckModal(false);
      setSelectedEvent(null); // 선택된 이벤트 초기화
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  // 일정 삭제 함수
  const handleDeleteEvent = async (eventToDelete) => {
    try {
      await axios.delete(`http://localhost:8080/api/calenders/${eventToDelete.memoNo}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEvents(events.filter(event => event !== eventToDelete)); // 일정 삭제 후 업데이트
      setScheduleCheckModal(false);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
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
            onSelectEvent={(event) => {
              setSelectedEvent(event); 
              setScheduleCheckModal(true);
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
      {/* 일정 확인 모달창 */}
      {scheduleCheckModal && selectedEvent && (
        <div className="Schedule-frame-78">
          <div className="Schedule-frame-79">
            <div className="Schedule-frame-80">
              <div className="Schedule-textAndClose">
                <div className="Schedule-text-wrapper-60">일정 확인</div>
              </div>
              <p className="Schedule-dateAndSchedule">
                <div className="Schedule-text-wrapper-64">{selectedEvent.end.toLocaleDateString()}</div>
                {selectedEvent.jobId && new Date(selectedEvent.end) >= new Date() ? (
                  <Link to={`/recruitinfo/${selectedEvent.jobId}`}>
                    <div className="Schedule-text-wrapper-65">{selectedEvent.title}</div>
                  </Link>
                ) : (
                  <div className="Schedule-text-wrapper-64">{selectedEvent.title}</div>
                )}
              </p>
            </div>
            {!selectedEvent.jobId ? ( // 스크랩한 일정이 아니라면 3가지 버튼 모두 출력
              <div className="Schedule-frame-81">
                <div className="Schedule-frame-84" onClick={() => setScheduleCheckModal(false)}>
                  <div className="Schedule-text-wrapper-62">닫기</div>
                </div>
                <div className="Schedule-frame-85" onClick={() => setEditScheduleModal(true)}>
                  <div className="Schedule-text-wrapper-63">수정</div>
                </div>
                <div className="Schedule-frame-86" onClick={() => handleDeleteEvent(selectedEvent)}>
                  <div className="Schedule-text-wrapper-62">삭제</div>
                </div>
              </div>
            ) : ( // 스크랩한 일정이면 닫기 버튼만 출력
              <div className="Schedule-frame-84" onClick={() => setScheduleCheckModal(false)}>
                <div className="Schedule-text-wrapper-62">닫기</div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* 일정 등록 모달창 */}
      {addScheduleModal && (
        <div className="Schedule-frame-78">
          <div className="Schedule-frame-79">
            <div className="Schedule-frame-80">
              <div className="Schedule-text-wrapper-60">일정 등록</div>
              <p className="Schedule-dateAndSchedule">
                <div className='Schedule-text-frame'>
                  <DatePicker 
                    className="Schedule-text-wrapper-61" 
                    selected={endDate || new Date()} 
                    onChange={date => setEndDate(date)}
                    locale="ko" // 한국어 로케일 설정
                    dateFormat="yyyy/MM/dd" // 날짜 형식을 숫자로 설정
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
                <div className="Schedule-text-wrapper-63">등록</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 일정 수정 모달창 */}
      {editScheduleModal && selectedEvent && (
        <div className="Schedule-frame-78">
          <div className="Schedule-frame-79">
            <div className="Schedule-frame-80">
              <div className="Schedule-text-wrapper-60">일정 수정</div>
              <p className="Schedule-dateAndSchedule">
                <div className='Schedule-text-frame'>
                  <DatePicker 
                    className="Schedule-text-wrapper-61" 
                    selected={endDate || new Date(selectedEvent.end)}
                    onChange={date => setEndDate(date)}
                    locale="ko" // 한국어 로케일 설정
                    dateFormat="yyyy/MM/dd" // 날짜 형식을 숫자로 설정
                  />
                </div>
                <input
                  className="Schedule-text-field"
                  type="text"
                  value={schedule || selectedEvent.title}
                  placeholder='일정을 입력하세요'
                  onChange={(e) => setSchedule(e.target.value)}
                />
              </p>
            </div>
            <div className="Schedule-frame-81">
              <div className="Schedule-frame-82" onClick={() => setEditScheduleModal(false)}>
                <div className="Schedule-text-wrapper-62">취소</div>
              </div>
              <div className="Schedule-frame-83" onClick={handleEditEvent}>
                <div className="Schedule-text-wrapper-63">수정</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;