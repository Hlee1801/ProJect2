import React from "react";
import { Spin } from "antd";
const Loading = () => {
  const LoadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "transparent",
  };
  return (
    <div style={LoadingStyle}>
      <Spin size="large" tip="Đang tải..." />
    </div>
  );
};

export default Loading;
