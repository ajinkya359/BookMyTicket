import React, { Fragment } from "react";
import styles from "./SeatModal.module.css";
import image from "../assets/modal-image.jpg";

const SeatModal = () => {
  return (
    <div className={styles.modal}>
      <h2>How Many Seats?</h2>
      <div>
        <img className={styles["modal-image"]} src={image} />
      </div>
      <div className={styles["seat-selection"]}>
        <div className={styles.seats}>1</div>
        <div className={styles.seats}>2</div>
        <div className={styles.seats}>3</div>
        <div className={styles.seats}>4</div>
        <div className={styles.seats}>5</div>
        <div className={styles.seats}>6</div>
      </div>
      <div className={styles.pricing}>
        <div>
          <h4>Executive</h4>
          <p className={styles.price}> Rs 130</p>
        </div>
        <div>
          <h4>Premium</h4>
          <p className={styles.price}> Rs 300</p>
        </div>
      </div>
      <div className={styles["submit-seat-button"]}>Select Seats</div>
    </div>
  );
};

export default SeatModal;
