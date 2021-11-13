import React from 'react'
import './TheatreDetail.css'

function TheatreDetail(props) {
    return (
        <div className="TheatreName">
          <p>{props.theatre_name}</p>
      </div>
    );
}

export default TheatreDetail
