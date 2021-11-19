import React,{useState} from "react";
import Button from "react-bootstrap/Button";
import "./MovieDetail.css";
import { Modal } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import backEndUrl from "../../Server/BackEndConnect/backEndUrl";

function MovieDetail(props) {
  const [modalShow, setModalShow] = useState(false);
  const [loading,setLoading]=useState(false)
  const [deleted,setDeleted]=useState(false)
  const movie_id=props.movie_id
  const movie_name=props.movie_name
  const time_stamp=props.time;

  const getTime = (unix_timestamp) => {
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  };
  const getDate = (unix_timestamp) => {
    var d = new Date(unix_timestamp * 1000);
    const yyyy = d.getFullYear();
    const mm = ("0" + (d.getMonth() + 1)).slice(-2); // Months are zero based. Add leading 0.
    const dd = ("0" + d.getDate()).slice(-2);
    return yyyy + "-" + mm + "-" + dd;
  };
    const date = getDate(time_stamp);
    const time = getTime(time_stamp);

  function MyVerticallyCenteredModal(props,text) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ color: "black" }}
      >
          <div>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {movie_name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>
                Are you sure you want to delete this movie {movie_name} on{" "}
                {date} at {time}.{" "}
              </h4>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
              <Button variant="danger" onClick={delteThisMovie}>
                Delete
              </Button>
            </Modal.Footer>
          </div>

      </Modal>
    );
  }

  const handleDeleteClick=()=>{
    delteThisMovie()
  }

  const delteThisMovie=async()=>{
    try {
      const url=backEndUrl+"/theatres/delete_movie";
      setLoading(true)
      const details={
        movie_id:movie_id,
        theatre_id:localStorage.getItem("theatre_id"),
        time:props.time
      }
      await axios.post(url,details,{withCredentials:true})
      .then(response=>{
        const data=response.data
        console.log(response.data);
        if(data.status) setDeleted(true)
        else alert(data.err)
      })
      .catch(err=>alert(err))
    } catch (error) {
      alert(error)
    }
    setLoading(false)
  }

  return (
    <div className="movie_details" style={{display:deleted?"none":"visible"}}>
      {console.log(props.index)}
      <div className="movie_name">{movie_name}</div>
      <div className="movie_name">
        <div>Date:{date}</div>
        <div>Time: {time}</div>
        <Button style={{ width: "50%" }}>Modify </Button>
      </div>
      {/* <div className="movie_name">
        Ticket basic fare
        <Button style={{ width: "50%" }}>Modify</Button>
      </div> */}
      {/* <div className="movie_name">
        Ticket premium fare
        <Button style={{ width: "50%" }}>Modify </Button>
      </div> */}
      <div className="movie_name">
        <Button
          variant="danger"
          style={{ width: "50%" }}
          onClick={handleDeleteClick}
        >
          {loading ? (
            <Spinner animation="border" variant="secondary" />
          ) : (
            "Delete"
          )}
        </Button>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
}

export default MovieDetail;
