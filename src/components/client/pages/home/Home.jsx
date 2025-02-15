import React from "react";
import Subscribe from "../subscribe/Subscribe";
import BestSeller from "../best/BestSeller";
import Latest from "../latest/Latest";

const Home = () => {
  return (
    <div>
      <Latest/>
      <BestSeller/>
      <Subscribe />
    </div>
  );
};

export default Home;
