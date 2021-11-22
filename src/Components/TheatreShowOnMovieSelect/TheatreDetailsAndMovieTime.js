import React from 'react'
import DateAndTime from './DateAndTime';
import TheatreDetail from './TheatreDetail';
import './TheatreDetailsAndMovieTime.css'

function TheatreDetailsAndMovieTime(props) {

    return (
      <div className="TheatreDetailsAndMovieTime">
        {/* {console.log(props)} */}

        <div className="TheatreDetails">
          <TheatreDetail theatre_name={props.theatreName} />
        </div>
        <div className="ShowTimes">
          {props.showTimes.map((e) => (
            <DateAndTime key={e} theatre_id={props.theatre_id} movie_id={props.movie_id}  time_stamp={e} />
          ))}
        </div>
      </div>
    );
}

export default TheatreDetailsAndMovieTime
