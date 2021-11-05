import React from 'react'
import DateAndTime from './DateAndTime';
import TheatreDetail from './TheatreDetail';
import './TheatreDetailsAndMovieTime.css'

function TheatreDetailsAndMovieTime(props) {
    // const time_list = showTimes.forEach((e) => (
    //   <DateAndTime time_stamp={e} />
    // ));
    return (
      <div className="TheatreDetailsAndMovieTime">
        {/* {console.log(props)} */}

        <div className="TheatreDetails">
          <TheatreDetail theatre_name={props.theatreName} />
        </div>
        <div className="ShowTimes">
          {props.showTimes.map((e) => (
            <DateAndTime key={e} time_stamp={e} />
          ))}
        </div>
      </div>
    );
}

export default TheatreDetailsAndMovieTime
