import React from 'react'
import './TheatreDetail.css'

function TheatreDetail(props) {
    return (
        <div className="TheatreName">
          <a>{props.theatre_name}</a>
      </div>
    );
}

export default TheatreDetail
