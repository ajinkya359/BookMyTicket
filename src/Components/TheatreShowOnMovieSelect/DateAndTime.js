import React from "react";
import "./DateAndTime.css";

function DateAndTime({time_stamp}) {
  const unix_to_human_redable = (unix_timestamp) => {
    var date = new Date(unix_timestamp * 1000);
    return date.toLocaleString();
  };
  return <div className="DateAndTimeCard">{unix_to_human_redable(time_stamp)}</div>;
}

export default DateAndTime;
