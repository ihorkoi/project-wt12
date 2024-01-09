import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { Wrapper, CalendarGlobalStyles } from './Datepicker_styled';

export const TimeChange = ({ startDate, setStartDate }) => {
  return (
    <Wrapper>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={5}
        timeCaption="time"
        dateFormat="HH:mm"
        timeFormat="HH:mm"
        isClearable={true}
      />
      <CalendarGlobalStyles />
    </Wrapper>
  );
};
