import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TheatreDetailsAndMovieTime from './TheatreDetailsAndMovieTime';

function TheatreList({movie_id}) {
    const [theatreDetails,setTheatreDetails]=useState([]);
    
    useEffect(()=>{
        console.log("making request")
        const body={id:movie_id};
        axios.post("http://localhost:5000/search_theatres",body)
        .then(response=>{
                // console.log(response)
            console.log(response.data)
            setTheatreDetails(response.data)
        })
        .catch(err=>console.log(err))
    },[movie_id])
    return (
        <div>
           {theatreDetails.map(e=><TheatreDetailsAndMovieTime key={e.theatre_id} theatreName={e.theatre_name} showTimes={e.times}/>)}
        </div>
    )
}

export default TheatreList
