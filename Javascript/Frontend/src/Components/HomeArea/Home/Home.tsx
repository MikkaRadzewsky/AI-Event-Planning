import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";

function Home(): JSX.Element {
  return (
    <div className="Home">
      <SearchBar />

      {/* add scroll? and reactive? */}
      {/* <MarvinOutput /> */}
    </div>
  );
}

export default Home;
