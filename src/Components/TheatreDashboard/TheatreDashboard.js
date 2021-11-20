import React,{useState,useEffect} from "react";
import NavBar from "../NavBar/NavBar";
import Button from "react-bootstrap/Button";
import MovieList from "./MovieList";
import "./TheatreDashboard.css";
import { useHistory } from "react-router";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import backEndUrl from "../../Server/BackEndConnect/backEndUrl";
import axios from "axios";

function TheatreDashboard() {
  const [modalShow, setModalShow] = React.useState(false);
  const [loading, setloading] = useState(false)
  const [refresh, setrefresh] = useState(false)
  const history = useHistory();
  const theatre_logged_in =
    localStorage.getItem("isTheatre") !== null &&
    localStorage.getItem("isTheatre");
  // if(theatre_logged_in===null) th

  const addMovieRequest = async () => {
    const movie_id=document.getElementById('movie_id').value
    const date=document.getElementById('date').value
    const time = document.getElementById("time").value;

    try {
      const details={
        theatre_id:localStorage.getItem("theatre_id"),
        movie_id:movie_id,
        date:date,
        time:time
      }
      const url=backEndUrl+"/theatres/add_movie"
      setloading(true)
      await axios.post(url,details,{withCredentials:true})
      .then(response=>{
        // alert('addmovie',response);
        if(response.status===200){
        console.log("add movie",response)
        setModalShow(false)
      }
      })
      .catch(err=>{
        alert(err)
      })
      setloading(false)
      setrefresh(!refresh);

      // console.log(docume);
    } catch (error) {
      alert(error)
    }
  };

  const handleAddMovieFormSubmit = (e) => {
    console.log("submitted")
    e.preventDefault();
      if(!loading)
    addMovieRequest();
  };
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        style={{ color: "black" }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Movie
          </Modal.Title>
        </Modal.Header>
        {loading ? (
          <div style={{ height: "30vh", alignContent: "center" }}>
            <Spinner animation="border" />
          </div>
        ) : (
          <Modal.Body>
            <Form onSubmit={handleAddMovieFormSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Movie ID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter movie ID here"
                  id="movie_id"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" placeholder="Date" id="date" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" placeholder="Time" id="time" />
              </Form.Group>
              <Modal.Footer>
                <Button onClick={props.onHide} variant="danger">
                  Cancel
                </Button>
                <Button type="submit">Add this movie</Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        )}
      </Modal>
    );
  }
  return (
    <div>
      {console.log("ola","refreshed")}
      {theatre_logged_in ? (
        <div className="parent_block">
          <NavBar searchBar={false} />
          <div className="theatre_dashboard">
            <Button
              variant="primary"
              className="add_button"
              onClick={() => setModalShow(true)}
            >
              + Add Movie
            </Button>
            <MovieList theatre_id={localStorage.getItem("theatre_id")} refresh={refresh}/>
          </div>
        </div>
      ) : (
        <div>
          <h1>first login ro see this page</h1>
          <Button
            variant="danger"
            onClick={() => history.push("/theatre/login")}
          >
            Theatre Login
          </Button>
        </div>
      )}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default TheatreDashboard;
