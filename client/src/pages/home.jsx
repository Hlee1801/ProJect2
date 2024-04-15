import React from "react";
import { Calendar, DatePicker } from "antd";
import { Banner, HomeWelComeText } from "components/common";

import HomeList from "components/HomeList";
const { RangePicker } = DatePicker;
const Home = () => {
  return (
    <>
      <Banner />
      <div className="container">
        <HomeWelComeText />
        <div style={{ marginTop: "10px" }}>
         

          <HomeList />
        </div>
      </div>
    </>
  );
};

export default Home;
