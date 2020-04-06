import React, {useState} from 'react';
import styled from 'styled-components'

import ReactCalendar from 'react-calendar'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const CalendarWrapper = styled.div`

  .react-calendar {
    margin: auto;
    border: 0px;
    width: 210px;

    .react-calendar__navigation {
      margin-bottom: 0px;

      .react-calendar__navigation__arrow {
        /* display: flex; */
        /* align-items: center; */
        /* justify-items: right; */
      }
    }

    .react-calendar__viewContainer {
      .react-calendar__month-view__weekdays{
        abbr{
          text-decoration: none;
        }
      }

      .react-calendar__month-view__days{
        .react-calendar__tile--now{
          background-color: #B4DBFF;
          border-radius: 55px;
        }

        .react-calendar__tile--active {
          background-color: #37A0FF;
          border-radius: 55px;
        }

      }

      .react-calendar__month-view__days__day--weekend{
        color: inherit;
      }

      .react-calendar__month-view__days__day--neighboringMonth{
        color: #757575
      }


    }
  }
`

const CalendarSmall = ( { selectedDay, setSelectedDay } ) => {

  return(
    <CalendarWrapper>
      <ReactCalendar 
        showFixedNumberOfWeeks
        calendarType='US'
        value={selectedDay}
        onClickDay={ (value, event) => setSelectedDay(value)}
        formatShortWeekday={(locale, value) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][value.getDay()]}
        next2Label={null}
        prev2Label={null}
        nextLabel={<IoIosArrowForward size='20px' />}
        prevLabel={<IoIosArrowBack size='20px' />}
      />
    </CalendarWrapper>
  )
}

export default CalendarSmall
