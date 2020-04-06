import React, {useState} from 'react';
import styled from 'styled-components'

import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';
import ReactCalendar from 'react-calendar'

import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import events from '../components/events'

import CalendarSmall from '../components/calendar-small'

const localizer = momentLocalizer(moment)

const CalendarWrapper = styled.div``
 
const MyCalendar = (props) => {
  const minTime = new Date();
  minTime.setHours(7,0,0);
  const maxTime = new Date();
  maxTime.setHours(22,0,0);

  return(
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        step={15}
        timeslots={4}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView={Views.WEEK}
        views={{week: true, day: true}}
        min={minTime}
        max={maxTime}
        toolbar={false}
        selectable
        date={props.date}
      />
    </div>
  )
}
  

export default function Home() {
  const { user, loading } = useFetchUser();
  const [inputText, setInputText] = useState('')

  const handleChange = (e) => {
    setInputText(e.target.value)
  }

  // example GET request
  const addUser = async () => {
    const res = await fetch('http://localhost:3000/api/mongotest', {
      method: 'post',
      body: JSON.stringify({
        inputText
      })
    })
  }

  const [selectedDay, setSelectedDay] =useState(new Date())
  console.log(selectedDay)

  return (
    <Layout user={user} loading={loading}>

      <CalendarSmall selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

      {/* <ReactCalendar 
        showFixedNumberOfWeeks
        calendarType='US'
        value={selectedDay}
        onClickDay={ (value, event) => setSelectedDay(value)}
        formatShortWeekday={(locale, value) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][value.getDay()]}
        next2Label={null}
        prev2Label={null}
      /> */}

      <MyCalendar date={selectedDay} />

      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <>
          <p>
            To test the login click in <i>Login</i>
          </p>
          <p>
            Once you have logged in you should be able to click in <i>Profile</i> and <i>Logout</i>
          </p>
        </>
      )}

      <hr />

      {user && (
        <>
          <h2>User Info (client rendered)</h2>
          <p></p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
      <input type="text" 
      value={inputText} 
      onChange={handleChange} 
      placeholder='type new todo item here' 
      required></input>
      <button onClick={addUser}>Add user</button>
    </Layout>
  );
}
