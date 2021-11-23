import React from "react";
import { useHistory } from "react-router";
import "./DateAndTime.css";

function DateAndTime({ time_stamp, theatre_id ,movie_id,theatre_name}) {
  const history=useHistory();
  const unix_to_human_redable = (unix_timestamp) => {
    var date = new Date(unix_timestamp * 1000);
    return date.toLocaleString();
  };
  const handleClick = () => {
    console.log(theatre_id);
    // history.push(history.push("/home", { update: true });)
    history.push(`/book_ticket/${theatre_id}/${movie_id}/${time_stamp}/${theatre_name}`);
  };
  return (
    <div className="DateAndTimeCard" onClick={handleClick}>
      {unix_to_human_redable(time_stamp)}
    </div>
  );
}

export default DateAndTime;
