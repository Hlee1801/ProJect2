import React from "react";
import { Layout, BackTop } from "antd";
import { UpOutlined } from "@ant-design/icons";
import NavBar from "./header";
const { Header, Footer, Content } = Layout;

const Main = ({ children }) => {
  return (
    <Layout>
      <Header>
        <NavBar />
      </Header>
      <Content>{children}</Content>
      <Footer>
        <BackTop>
          <div
            style={{
              height: 40,
              width: 40,
              lineHeight: "40px",
              borderRadius: 4,
              backgroundColor: "#1088e9",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            <UpOutlined style={{ color: "#fff" }} />
          </div>
        </BackTop>
      </Footer>
    </Layout>
  );
};

export default Main;
