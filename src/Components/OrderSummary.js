import React, { useState } from "react";
import * as ReactBootstrap from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import styles from "./OrderSummary.module.css";
import axios from "axios";
import backEndUrl from "../Server/BackEndConnect/backEndUrl";
import { Spinner } from "react-bootstrap";

const OrderSummary = (props) => {
  const [cardDetails, setCardDetails] = useState({
    name: null,
    cardNumber: null,
    expiryDate: null,
    cvc: null,
    UPIid: null,
  });
  console.log(props.details)
  const history=useHistory()
  
  // const params=useParams();
  const total_cost=props.details.total_cost
  const theatre_name=props.details.theatre_name
  const time=props.details.time
  const premium=props.details.premium
  const standard=props.details.standard
  const selected=props.details.selected
  const [loading, setloading] = useState(false)
  const make_book_ticket_request = async () => {
    console.log("Yp");
    const url = backEndUrl + "/users/book_ticket";
    const details = {
      movie_id: props.details.movie_id,
      time: time,
      theatre_id: props.details.theatre_id,
      user_id: localStorage.getItem("userID"),
      seats: props.details.seats,
    };

    console.log("Details", details);
    setloading(true)
    try {
      await axios
        .post(url, details, { withCredentials: true })
        .then((response) => {
          console.log(response.data);
          alert("You ticket is booked");
          history.push('/')
          selected.forEach((e) => {
            document.getElementById(e).className = "disabled";
          });
        })
        .catch((err) => {
          // alert(err);
          console.log(err);
        });
    } catch (error) {
      alert(error);
    }
    setloading(false)
    history.push('/')
    // setModalShow(false);
  };
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
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCardDetails((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    make_book_ticket_request()

  }

  return (
    <div className={styles.main}>
      <div style={{ display: loading ? "visible" : "none" }}>
        <Spinner animation="border" />
      </div>
      <div
        className={styles.payments}
        style={{ display: !loading ? "visible" : "none" }}
      >
        <h1 className={styles["payment-header"]}>Select Payment Method</h1>
        <ReactBootstrap.Dropdown className={styles["payment-option"]}>
          <ReactBootstrap.Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className={styles["payment-option"]}
          >
            Credit/Debit Card
          </ReactBootstrap.Dropdown.Toggle>

          <ReactBootstrap.Dropdown.Menu>
            <div className={styles.form}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  type="tel"
                  placeholder="Card Number"
                  value={cardDetails.cardNumber}
                  onChange={handleChange}
                  name="cardNumber"
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={cardDetails.name}
                  onChange={handleChange}
                  name="name"
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={handleChange}
                  name="expiryDate"
                  className={styles.input}
                />
                <input
                  type="tel"
                  placeholder="CVC"
                  value={cardDetails.cvc}
                  onChange={handleChange}
                  name="cvc"
                  className={styles.input}
                />
                <ReactBootstrap.Button
                  variant="primary"
                  type="submit"
                  className={styles.submit}
                >
                  Submit
                </ReactBootstrap.Button>
              </form>
            </div>
          </ReactBootstrap.Dropdown.Menu>
        </ReactBootstrap.Dropdown>

        <ReactBootstrap.Dropdown className={styles["payment-option"]}>
          <ReactBootstrap.Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className={styles["payment-option"]}
          >
            Using UPIid
          </ReactBootstrap.Dropdown.Toggle>

          <ReactBootstrap.Dropdown.Menu>
            <div className={styles.form}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="UPIid"
                  value={cardDetails.UPIid}
                  onChange={handleChange}
                  name="UPIid"
                  className={styles.input}
                />

                <ReactBootstrap.Button
                  variant="primary"
                  type="submit"
                  className={styles.submit}
                >
                  Submit
                </ReactBootstrap.Button>
              </form>
              <p>You will recieve a notification on your entered UPI ID</p>
            </div>
          </ReactBootstrap.Dropdown.Menu>
        </ReactBootstrap.Dropdown>
      </div>

      <div className={styles.summary}>
        <h1 className={styles["payment-header"]}>Order Summary</h1>
        <h2 className={styles["movie-title"]}>Movie Name Movie Name</h2>
        <div className={styles["summary-content"]}>
          <div className={styles["booked-movie-details"]}>
            <p>Theatre:{theatre_name}</p>
            <p>Date: {getDate(time)}</p>
            <p>Time: {getTime(time)}</p>
          </div>
          <div>
            <div className={styles.content}>
              <p>Premium Seats: {premium}</p>
              <p>Standard Seats: {standard}</p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles["pricing-div"]}>
            <div className={styles.content}>Sub Total</div>
            <div className={styles.content}>Rs {total_cost}</div>
          </div>
          <div className={styles["pricing-div"]}>
            <div className={styles.content}>Tax(15%)</div>
            <div className={styles.content}>Rs {0.15 * total_cost}</div>
          </div>
          <div className={styles["pricing-div"]}>
            <div className={styles.content}>Payable Amount</div>
            <div className={styles.price}>
              Rs {Math.round(1.15 * total_cost)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
