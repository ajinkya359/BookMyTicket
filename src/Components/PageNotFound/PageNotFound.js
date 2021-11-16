import React from "react";
import styles from "./PageNotFound.module.css";
import { useHistory } from "react-router";

function PageNotFound() {
    const history=useHistory();
    const handleClick=()=>{
        history.push('/')
    }
  return (
    <div>
      <a href="" target="_blank">
        <header class="top-header"></header>

        <div>
          <div class={styles["starsec"]}></div>
          <div class={styles["starthird"]}></div>
          <div class={styles["starfourth"]}></div>
          <div class={styles["starfifth"]}></div>
        </div>

        <div class={styles["lamp__wrap"]}>
          <div class={styles["lamp"]}>
            <div class={styles["cable"]}></div>
            <div class={styles["cover"]}></div>
            <div class={styles["in-cover"]}>
              <div class={styles["bulb"]}></div>
            </div>
            <div class={styles["light"]}></div>
          </div>
        </div>
        <section class={styles["error"]}>
          <div class={styles["error__content"]}>
            <div class={styles["error__message message"]}>
              <h1 class={styles["message__title"]}>Page Not Found</h1>
              <p class={styles["message__text"]}>
                We're sorry, the page you were looking for isn't found here. The
                link you followed may either be broken or no longer exists.
                Please try again, or take a look at our.
              </p>
            </div>
            <div class={styles["error__nav e-nav"]}>
              <a href="" target="_blanck" class={styles["e-nav__link"]} onClick={handleClick}></a>
            </div>
          </div>
        </section>
      </a>
    </div>
  );
}

export default PageNotFound;
