import React, { useState } from "react";
import * as ReactBootstrap from "react-bootstrap";
import styles from "./OrderSummary.module.css";

const OrderSummary = () => {
  const [cardDetails, setCardDetails] = useState({
    name: null,
    cardNumber: null,
    expiryDate: null,
    cvc: null,
    UPIid: null,
  });

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

  return (
    <div className={styles.main}>
      <div className={styles.payments}>
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
              <form className={styles.form}>
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
              <form className={styles.form}>
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
            <p>Theatre Name</p>
            <p>Day & Date</p>
            <p>Show Time</p>
          </div>
          <div>
            <div className={styles.content}>
              <p>2</p>
              <p>Tickets</p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles["pricing-div"]}>
            <div className={styles.content}>Sub Total</div>
            <div className={styles.content}>Rs 537</div>
          </div>
          <div className={styles["pricing-div"]}>
            <div className={styles.content}>Tax</div>
            <div className={styles.content}>Rs 37.83</div>
          </div>
          <div className={styles["pricing-div"]}>
            <div className={styles.content}>Payable Amount</div>
            <div className={styles.price}>Rs 664.83</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
