import React from "react";
import "./DateAndTime.css";

function DateAndTime({time_stamp}) {
  const unix_to_human_redable = (unix_timestamp) => {
    var date = new Date(unix_timestamp * 1000);
    return date.toLocaleString();
    // var hours = date.getHours();
    // var minutes = "0" + date.getMinutes();
    // var seconds = "0" + date.getSeconds();
    // var formattedTime =
    //   hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    // return formattedTime;
  };
  return <div className="DateAndTimeCard">{unix_to_human_redable(time_stamp)}</div>;
}

export default DateAndTime;
