import React, { useEffect, useState } from "react";
import "./SeatStatus.css";
import { Spinner } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { useParams } from "react-router";
import backEndUrl from "../../Server/BackEndConnect/backEndUrl";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import axios from "axios";
import OrderSummary from "../OrderSummary";

function Seats(props) {
  const [loading, setLoading] = useState(false);
  const [details, setdetails] = useState({})
  const params = useParams();
  const history = useHistory();
  const [modalShow, setModalShow] = React.useState(false);
  const theatre_name = params.theatre_name;
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  // var selected = [];

  const [selected, setselected] = useState([]);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrderSummary/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="danger">
            Close
          </Button>
          <Button onClick={make_book_ticket_request}>Book These tickets</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const make_book_ticket_request = async () => {
    console.log("Yp");
    const url = backEndUrl + "/users/book_ticket";
    const details = {
      movie_id: params.movie_id,
      time: params.time,
      theatre_id: params.theatre_id,
      user_id: localStorage.getItem("userID"),
      seats: selected,
    };

    console.log("Details", details);

    try {
      await axios
        .post(url, details, { withCredentials: true })
        .then((response) => {
          console.log(response.data);
          alert("You ticket is booked");

          selected.forEach((e) => {
            document.getElementById(e).className = "disabled";
          });
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    } catch (error) {
      alert(error);
    }
    setModalShow(false);
  };
  const get_all_booked_seats = async () => {
    const url = backEndUrl + "/users/get_all_booked_seats";
    // setLoading(true);

    try {
      const details = {
        theatre_id: params.theatre_id,
        movie_id: params.movie_id,
        time: params.time,
      };
      await axios
        .post(url, details, { withCredentials: true })
        .then((response) => {
          const data = response.data;
          // console.log("bookedseats", data);
          // // setBookedSeats(data);
          // // console.log("booked-seats", bookedSeats);
          // console.log("here");
          // setModalShow(false);
          data.forEach((e) => {
            console.log("hello", e.seat);
            document.getElementById(`${e.seat}`).className = "disabled";
          });
        })
        .catch((err) => alert(err));
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    get_all_booked_seats();
    console.log("params", params);
  }, []);

  const handleClick = (e) => {
    console.log(e.target.attributes.id.value);
    const id = e.target.attributes.id.value;
    var temp = selected;
    if (temp.indexOf(id) > -1) {
      console.log("removin");
      const index = temp.indexOf(id);
      if (index > -1) {
        temp.splice(index, 1);
      }
      setselected(temp);
      document.getElementById(id).className = "seat";
    } else {
      temp.push(id);
      setselected(temp);
      document.getElementById(id).className = "selected";
    }
    console.log(selected);
  };
  const signed_in = localStorage.getItem("userID") !== null ? true : false;
  // const [price, setprice] = useState(0)
  // const [premium, setpremium] = useState(0)
  // const [state, setstate] = useState(initialState)
  const handleBookSeatsButton = () => {
    var price = 0;
    var premium = 0;
    var standard = 0;
    selected.forEach((e) => {
      if (e[0] === "p") {
        price = price + 300;
        premium += 1;
      } else {
        price = price + 130;
        standard+=1
      }
    });
    handleShow(true);
    setdetails({
      movie_id: params.movie_id,
      time: params.time,
      theatre_id: params.theatre_id,
      user_id: localStorage.getItem("userID"),
      seats: selected,
      premium:premium,
      standard:standard,
      total_cost:premium*300+standard*130,
      theatre_name:theatre_name,
    })
    // history.push(`/order_summary/${price}/${theatre_name}/${params.time}/${premium}/${standard}`);
  };
  return (
    <>
      <div className="wrapper">
        <div style={{ display: !signed_in ? "visible" : "none" }}>
          Sign in as a user first
        </div>
        <div style={{ display: loading ? "visible" : "none" }}>
          <Spinner animation="border" variant="secondary" />
        </div>
        <div
          className="container1"
          style={{ display: signed_in && !loading ? "visible" : "none" }}
        >
          <div className="screen">All eyes this way please.</div>
          <div className="seats-status">
            <div className="seats_table">
              <table>
                <tr>
                  <td className="row">A</td>
                  <td className="real-seat">
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={1}
                      column={1}
                      onClick={handleClick}
                      id="11"
                    >
                      1
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={2}
                      onClick={handleClick}
                      id="12"
                    >
                      2
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={3}
                      onClick={handleClick}
                      id="13"
                    >
                      3
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={4}
                      onClick={handleClick}
                      id="14"
                    >
                      4
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={5}
                      onClick={handleClick}
                      id="15"
                    >
                      5
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={5}
                      onClick={handleClick}
                      id="16"
                    >
                      6
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={1}
                      column={7}
                      onClick={handleClick}
                      id="17"
                    >
                      7
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={8}
                      onClick={handleClick}
                      id="18"
                    >
                      8
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={9}
                      onClick={handleClick}
                      id="19"
                    >
                      9
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={10}
                      onClick={handleClick}
                      id="110"
                    >
                      10
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={11}
                      onClick={handleClick}
                      id="111"
                    >
                      11
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={12}
                      onClick={handleClick}
                      id="112"
                    >
                      12
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                  </td>
                </tr>
                <tr>
                  <td className="row">B</td>
                  <td className="real-seat">
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={2}
                      column={1}
                      onClick={handleClick}
                      id="21"
                    >
                      1
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={2}
                      onClick={handleClick}
                      id="22"
                    >
                      2
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={3}
                      onClick={handleClick}
                      id="23"
                    >
                      3
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={4}
                      onClick={handleClick}
                      id="24"
                    >
                      4
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={5}
                      onClick={handleClick}
                      id="25"
                    >
                      5
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={6}
                      onClick={handleClick}
                      id="26"
                    >
                      6
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={2}
                      column={7}
                      onClick={handleClick}
                      id="27"
                    >
                      7
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={8}
                      onClick={handleClick}
                      id="28"
                    >
                      8
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={9}
                      onClick={handleClick}
                      id="29"
                    >
                      9
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={10}
                      onClick={handleClick}
                      id="210"
                    >
                      10
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={11}
                      onClick={handleClick}
                      id="211"
                    >
                      11
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={12}
                      onClick={handleClick}
                      id="212"
                    >
                      12
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                  </td>
                </tr>
                <tr>
                  <td className="row">C</td>
                  <td className="real-seat">
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={3}
                      column={1}
                      onClick={handleClick}
                      id="31"
                    >
                      1
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={2}
                      onClick={handleClick}
                      id="32"
                    >
                      2
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={3}
                      onClick={handleClick}
                      id="33"
                    >
                      3
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={4}
                      onClick={handleClick}
                      id="34"
                    >
                      4
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={5}
                      onClick={handleClick}
                      id="35"
                    >
                      5
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={6}
                      onClick={handleClick}
                      id="36"
                    >
                      6
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={3}
                      column={7}
                      onClick={handleClick}
                      id="37"
                    >
                      7
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={8}
                      onClick={handleClick}
                      id="38"
                    >
                      8
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={9}
                      onClick={handleClick}
                      id="39"
                    >
                      9
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={10}
                      onClick={handleClick}
                      id="310"
                    >
                      10
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={11}
                      onClick={handleClick}
                      id="311"
                    >
                      11
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={12}
                      onClick={handleClick}
                      id="312"
                    >
                      12
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                  </td>
                </tr>
                <tr>
                  <td className="row">D</td>
                  <td className="real-seat">
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={4}
                      column={1}
                      onClick={handleClick}
                      id="41"
                    >
                      1
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={2}
                      onClick={handleClick}
                      id="42"
                    >
                      2
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={3}
                      onClick={handleClick}
                      id="43"
                    >
                      3
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={4}
                      onClick={handleClick}
                      id="44"
                    >
                      4
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={5}
                      onClick={handleClick}
                      id="45"
                    >
                      5
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={6}
                      onClick={handleClick}
                      id="46"
                    >
                      6
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={4}
                      column={7}
                      onClick={handleClick}
                      id="47"
                    >
                      7
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={8}
                      onClick={handleClick}
                      id="48"
                    >
                      8
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={9}
                      onClick={handleClick}
                      id="49"
                    >
                      9
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={10}
                      onClick={handleClick}
                      id="410"
                    >
                      10
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={11}
                      onClick={handleClick}
                      id="411"
                    >
                      11
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={12}
                      onClick={handleClick}
                      id="412"
                    >
                      12
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td>
                    {" "}
                    <div className="lable">EXECUTIVE-Rs. 130.00</div>
                  </td>
                </tr>
                <tr>
                  <td className="row">E</td>
                  <td className="real-seat">
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={1}
                      column={1}
                      premium={1}
                      onClick={handleClick}
                      id="p11"
                    >
                      1
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={2}
                      premium={1}
                      onClick={handleClick}
                      id="p12"
                    >
                      2
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={3}
                      premium={1}
                      onClick={handleClick}
                      id="p13"
                    >
                      3
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={4}
                      premium={1}
                      onClick={handleClick}
                      id="p14"
                    >
                      4
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={5}
                      premium={1}
                      onClick={handleClick}
                      id="p15"
                    >
                      5
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={6}
                      premium={1}
                      onClick={handleClick}
                      id="p16"
                    >
                      6
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={1}
                      column={7}
                      premium={1}
                      onClick={handleClick}
                      id="p17"
                    >
                      7
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={8}
                      premium={1}
                      onClick={handleClick}
                      id="p18"
                    >
                      8
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={9}
                      premium={1}
                      onClick={handleClick}
                      id="p19"
                    >
                      9
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={10}
                      premium={1}
                      onClick={handleClick}
                      id="p110"
                    >
                      10
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={11}
                      premium={1}
                      onClick={handleClick}
                      id="p111"
                    >
                      11
                    </div>
                    <div
                      className="seat"
                      row={1}
                      column={12}
                      premium={1}
                      onClick={handleClick}
                      id="p112"
                    >
                      12
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                  </td>
                </tr>
                <tr>
                  <td className="row">F</td>
                  <td className="real-seat">
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={2}
                      column={1}
                      premium={1}
                      onClick={handleClick}
                      id="p21"
                    >
                      1
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={2}
                      premium={1}
                      onClick={handleClick}
                      id="p22"
                    >
                      2
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={3}
                      premium={1}
                      onClick={handleClick}
                      id="p23"
                    >
                      3
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={4}
                      premium={1}
                      onClick={handleClick}
                      id="p24"
                    >
                      4
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={5}
                      premium={1}
                      onClick={handleClick}
                      id="p25"
                    >
                      5
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={6}
                      premium={1}
                      onClick={handleClick}
                      id="p26"
                    >
                      6
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={2}
                      column={7}
                      premium={1}
                      onClick={handleClick}
                      id="p27"
                    >
                      7
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={8}
                      premium={1}
                      onClick={handleClick}
                      id="p28"
                    >
                      8
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={9}
                      premium={1}
                      onClick={handleClick}
                      id="p29"
                    >
                      9
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={10}
                      premium={1}
                      onClick={handleClick}
                      id="p210"
                    >
                      10
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={11}
                      premium={1}
                      onClick={handleClick}
                      id="p211"
                    >
                      11
                    </div>
                    <div
                      className="seat"
                      row={2}
                      column={12}
                      premium={1}
                      onClick={handleClick}
                      id="p212"
                    >
                      12
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                  </td>
                </tr>
                <tr>
                  <td className="row">G</td>
                  <td className="real-seat">
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={3}
                      column={1}
                      premium={1}
                      onClick={handleClick}
                      id="p31"
                    >
                      1
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={2}
                      premium={1}
                      onClick={handleClick}
                      id="p32"
                    >
                      2
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={3}
                      premium={1}
                      onClick={handleClick}
                      id="p33"
                    >
                      3
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={4}
                      premium={1}
                      onClick={handleClick}
                      id="p34"
                    >
                      4
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={5}
                      premium={1}
                      onClick={handleClick}
                      id="p35"
                    >
                      5
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={6}
                      premium={1}
                      onClick={handleClick}
                      id="p36"
                    >
                      6
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={3}
                      column={7}
                      premium={1}
                      onClick={handleClick}
                      id="p37"
                    >
                      7
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={8}
                      premium={1}
                      onClick={handleClick}
                      id="p31"
                    >
                      8
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={9}
                      premium={1}
                      onClick={handleClick}
                      id="p39"
                    >
                      9
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={10}
                      premium={1}
                      onClick={handleClick}
                      id="p310"
                    >
                      10
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={11}
                      premium={1}
                      onClick={handleClick}
                      id="p311"
                    >
                      11
                    </div>
                    <div
                      className="seat"
                      row={3}
                      column={12}
                      premium={1}
                      onClick={handleClick}
                      id="p312"
                    >
                      12
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                  </td>
                </tr>
                <tr>
                  <td className="row">H</td>
                  <td className="real-seat">
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={4}
                      column={1}
                      premium={1}
                      onClick={handleClick}
                      id="p41"
                    >
                      1
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={2}
                      premium={1}
                      onClick={handleClick}
                      id="p42"
                    >
                      2
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={3}
                      premium={1}
                      onClick={handleClick}
                      id="p43"
                    >
                      3
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={4}
                      premium={1}
                      onClick={handleClick}
                      id="p44"
                    >
                      4
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={5}
                      premium={1}
                      onClick={handleClick}
                      id="p45"
                    >
                      5
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={6}
                      premium={1}
                      onClick={handleClick}
                      id="p46"
                    >
                      6
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                    <div
                      className="seat"
                      row={4}
                      column={7}
                      premium={1}
                      onClick={handleClick}
                      id="p47"
                    >
                      7
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={8}
                      premium={1}
                      onClick={handleClick}
                      id="p48"
                    >
                      8
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={9}
                      premium={1}
                      onClick={handleClick}
                      id="p49"
                    >
                      9
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={10}
                      premium={1}
                      onClick={handleClick}
                      id="p410"
                    >
                      10
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={11}
                      premium={1}
                      onClick={handleClick}
                      id="p411"
                    >
                      11
                    </div>
                    <div
                      className="seat"
                      row={4}
                      column={12}
                      premium={1}
                      onClick={handleClick}
                      id="p412"
                    >
                      12
                    </div>
                    <div className="seate"></div>
                    <div className="seate"></div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <>
                    <div className="lable">PREMIUM-Rs. 300.00</div>
                  </>
                </tr>
              </table>
              <Button
                style={{ "margin-left": "25vw" }}
                onClick={(handleBookSeatsButton)}
                // onClick={()=>setModalShow(true)}
                // onClick={() => handleShow(true)}
              >
                Book these seats
              </Button>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                style={{ color: "black" }}
              />
              <Modal
                show={show}
                fullscreen={fullscreen}
                onHide={() => setShow(false)}
              >
                <Modal.Header closeButton style={{ color: "black" }}>
                  <Modal.Title style={{ color: "black" }}>
                    Order Details
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <OrderSummary details={details}/>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Seats;
