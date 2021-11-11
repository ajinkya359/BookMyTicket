import React from 'react'
import './MovieDetails.css'

function MovieDetails({name}) {
    return (
        <div className="MovieDetails">
           <div className="MovieName">
            <h4>
                {name}
            </h4>
           </div>
        </div>
    )
}

export default MovieDetails
