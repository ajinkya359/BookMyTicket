import React, { Fragment, useState } from "react";
import NavBar from "../NavBar/NavBar";
import GetMovies from "./GetMovies";

const HomePage = () => {
  const [searchValue, setSearchValue] = useState({
    value: "",
    status: false,
  });
  return (
    <Fragment>
      {/* {console.log(localStorage.getItem('user'))} */}
      <NavBar searchValue={searchValue} setSearchValue={setSearchValue} loggedin={localStorage.getItem('sessionID')!==null}/>
      {!searchValue.status ? (
        <GetMovies searchTitle={null} />
      ) : (
        <GetMovies searchTitle={searchValue.value} />
      )}
    </Fragment>
  );
};

export default HomePage;
