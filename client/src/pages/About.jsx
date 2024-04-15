import React from "react";
import {  DatePicker, Empty } from "antd";
import Title from "antd/lib/typography/Title";
import HomeList from "components/HomeList";
const { RangePicker } = DatePicker;
const About = () => {

  return (
    <div className="mx-4">
      <Title level={3}>Chọn ngày</Title>
      <div className="my-3 ">
        <RangePicker />
      </div>
      <div className="container">
      <HomeList/>
      </div>
    </div>
  );
};

export default About;
