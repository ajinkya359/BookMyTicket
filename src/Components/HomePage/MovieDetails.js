import React, { Fragment, useEffect, useState } from "react";
import * as ReactBootstrap from "react-bootstrap";
import { useParams } from "react-router-dom";
import styles from "./MovieDetails.module.css";
import { useHistory } from "react-router";
import { currentAPIKey } from "../../Server/BackEndConnect/apiKeys";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import backEndUrl from "../../Server/BackEndConnect/backEndUrl";

const MovieDetails = () => {
  const params = useParams();
  const [id, changeId] = useState("");
  const [diabled, setdiabled] = useState(false)
  const history=useHistory();
  const theatreDetailsUrl = "/theatres_list/" + id.substring(2, id.length);
  const isTheatre=localStorage.getItem('isTheatre')!=null
  const [loading, setloading] = useState(false)
  const [isFetched, setFetched] = useState({
    status: false,
    message: (
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    ),
    data: "",
  });

  const handleAddThisToMovieDatabase=async ()=>{
    setloading(true)
    console.log('ola',"ola");
    const details = {
      movie_id: id.substring(2, id.length),
      movie_name: isFetched.data.fullTitle,
    };
    const url = backEndUrl + "/theatres/add_this_movie_to_movies_database";
    try {
      await axios.post(url, details, { withCredentials: true })
      .then(response=>{
        console.log(response);
        alert("Movie added")
        setdiabled(true)
      })
      .catch(err=>{
        // alert(err)
        console.log(err);
      })
    } catch (error) {
      alert(error)
    }
    setloading(false)
  }

  const fetchMovieDetails = async () => {
    const url =
      `https://imdb-api.com/en/API/Title/${currentAPIKey}/` + params.movieId;
    // console.log(url);
    const response = await fetch(url);
    if (response.status >= 200 && response.status <= 299)
      return response.json();
    else throw new Error("Unable to fetch Movie Details");
  };
  const added_or_not=async()=>{
    const details={
      movie_id:id.substring(2, id.length)
    }
    const url=backEndUrl+'/theatres/added_or_not';
    try {
      await axios.post(url,details,{withCredentials:true})
      .then(res=>{
        if(res.data.registered) setdiabled(true)
        else setdiabled(false)
        console.log(res);
      })
      .catch(err=>alert(err))
    } catch (error) {
      alert(error)
    }
  }
  useEffect(() => {
  if(id===''){
    const response = fetchMovieDetails();
    response
      .then((data) => {
        // console.log(data);
        setFetched({
          status: true,
          message: "",
          data: data,
        });
        changeId(data.id)
        added_or_not();

      })
      .catch((err) => {
        setFetched({
          status: false,
          message: err.message,
          data: "",
        });
      });
    }
    else {
        added_or_not();
    }
      

  },[id]);

const handleClick=()=>{
  history.push(theatreDetailsUrl)
}


  // console.log(params.movieId);
  return (
    <Fragment>
      {!isFetched.status && <p>{isFetched.message}</p>}
      {isFetched.status && (
        <div>
          {/* {console.log(isFetched.data)} */}
          {console.log(id.substring(2, id.length))}
          <ReactBootstrap.Card bg="dark" text="light">
            <ReactBootstrap.Card.Header className={styles.header}>
              {isFetched.data.fullTitle}
              <br />
              Movie ID: {id.substring(2, id.length)}
            </ReactBootstrap.Card.Header>
            <ReactBootstrap.Card.Body className={styles.body}>
              <ReactBootstrap.Card.Img
                variant="top"
                src={isFetched.data.image}
                className={styles.img}
              />
              <ReactBootstrap.Card.Text className={styles.plot}>
                {isFetched.data.plot}
              </ReactBootstrap.Card.Text>
            </ReactBootstrap.Card.Body>
            {/* <Link to={theatreDetailsUrl}> */}
            <ReactBootstrap.Button
              variant="danger"
              onClick={handleClick}
              style={{ display: !isTheatre ? "visible" : "none" }}
            >
              Book Ticket
            </ReactBootstrap.Button>
            <ReactBootstrap.Button
              disabled={diabled}
              onClick={handleAddThisToMovieDatabase}
              style={{ display: isTheatre ? "visible" : "none" }}
            >
              <Spinner
                animation="border"
                style={{ display: loading ? "visible" : "none" }}
              />
              <div style={{ display: !loading ? "visible" : "none" }} onClick={handleAddThisToMovieDatabase}>
                Add This movie to movie database.
              </div>
            </ReactBootstrap.Button>
            {/* </Link> */}
          </ReactBootstrap.Card>
        </div>
      )}
    </Fragment>
  );
};

export default MovieDetails;
