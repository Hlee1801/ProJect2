import React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Avatar,
  Row,
  Col,
  Typography,
  Select,
  Descriptions,
} from "antd";
import { useTranslation } from "react-i18next";
const { Title, Text } = Typography;
const { Option } = Select;
function Info() {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const data = user.user;
  return (
    <>
      <Avatar
        size={"large"}
        src={user.user.avatar}
        style={{ width: "150px", height: "150px" }}
      />
      <Descriptions title={t("navbar.info")} layout="vertical">
        <Descriptions.Item label={t("signup.name")}>
          {data.fullName}
        </Descriptions.Item>
        <Descriptions.Item label={t("signup.phone")}>
          {data.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label={t("signup.address")}>
          {data.address}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
        <Descriptions.Item label={t("signup.gender")}>
          {data.gender}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}

export default Info;
