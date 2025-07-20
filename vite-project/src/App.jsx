import { use, useState } from "react";
import { format, addDays, addMonths, addYears, eachDayOfInterval, isBefore, set, addWeeks } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css'

function RecurringDatePicker() {
  const [recurrence, setRecurrence] = useState("daily"); // set recurrence as daily by default.
  const [dayOfWeek, setDayOfWeek] = useState([]); // set day of week as empty array.
  const [interval, setInterval] = useState(1); // set interval to start with 1 by default.
  const [startDate, setStartDate] = useState(new Date()); // set start date as current/new date.
  const [endDate, setEndDate] = useState(null); // set end date as null to make it optional.
  const [recurrenceDay, setRecurrenceDay] = useState([])

  //toggle function to check which day of the week is choosen by user.
  const dayOfWeekToggle = (day) => {
    setDayOfWeek((prev)=> 
      //checking if day is alrerady choosen remove/filter out if not, merge the array.
      prev.includes(day) ? prev.filter((d)=> d !== day) : [...prev, day]
    )
  }

  const recurringDates = () => {
    //return an empty array if user not sected start date.
    if(!startDate){
      return [];
    }
    const dates = []; // initilizing an empty array.
    let currentDate = new Date(startDate); // initilizing current date.
    
    //initializing last date, if last date not given, take one year till date by default.
    const lastDate = endDate ? new Date(endDate) : addYears(startDate, 1)

    while(isBefore(currentDate, lastDate) || currentDate.getTime() === lastDate.getTime()){
      //checking if recurrence day is choosen as daily, then push current date to the dates array.
      if(recurrence === 'daily'){
        dates.push(new Date(currentDate));
        //add days with interval.
        currentDate = addDays(currentDate, interval)
      }
      //checking if recurrence day is choosen as weekly, then push current date to the dates array.
      else if(recurrence === 'weekly'){
        //checking the dayOfWeek array is empty or selected day already exist.
        if (dayOfWeek.length === 0 || dayOfWeek.includes(currentDate.getDay())) {
          dates.push(new Date(currentDate));
        }
        //add weeks with interval.
        currentDate = addDays(currentDate, interval)
      }
      //checking if recurrence day is choosen as mothly, then push current date to the dates array.
      else if(recurrence === 'monthly'){
        dates.push(currentDate);
        //add months with interval.
        currentDate = addMonths(currentDate, interval)
      }
      //checking if recurrence day is choosen as yearly, then push current date to the dates array.
      else if(recurrence === 'yearly'){
        dates.push(currentDate);
        //add years with interval.
        currentDate = addYears(currentDate, interval)
      }
    }
    return dates;
  }

  const recurrencedate = recurringDates() // call back the recurringdates function and getting the dates array.
  
  //return the whole content.
  return (
    <>
      <main className="container">
        <div className="title-container"><h1>Recurring Date Picker</h1></div>

        <div className="recurrence-type-container global-container">
          <h2>Recurrence Type:</h2>
          <select className="selection" value={recurrence} onChange={((e)=>{setRecurrence(e.target.value)})}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="interval-container global-container">
          <h2>Intervals:</h2>
          <input type="number" 
            value={interval}
            onChange={((e)=>{setInterval(parseInt(e.target.value))})}
            min={1}
          />
        </div>

        <div className="day-select-container global-container">
          {
            recurrence === "weekly" &&
            <div className="day-container global-container">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index)=>(
                <label key={day}>
                  <input type="checkbox"
                   checked={dayOfWeek.includes(index)}
                   onChange={()=> dayOfWeekToggle(index)}
                  />
                  {day}
                </label>
              ))}
            </div>
          }
        </div>

        <div className="date-container global-container">
          <div className="startDate-container">
            <h2>Start Date:</h2>
            <DatePicker
              selected={startDate}
              onChange={(date)=>setStartDate(date)}
            />
          </div>
          <div className="endDate-container">
            <h2>End Date:</h2>
            <DatePicker
              selected={endDate}
              onChange={(date)=>setEndDate(date)}
            />
          </div>
        </div>

          <div className="global-container"><h2>Recurring Date Preview:</h2></div>
        <div className="date-preview-containner global-container">
          {
            recurrencedate.map((date, index) => (
              <div key={index} className="date-card">
                {
                  format(date, "dd-MM-yyyy (EEEE)" )
                }
              </div>
            ))
          }
        </div>
      </main>
    </>
  );
}

export default RecurringDatePicker;
