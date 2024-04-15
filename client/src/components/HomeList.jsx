import React from "react";
import { useQuery } from "react-query";
import { Typography, Row, Empty, Select, Col, Radio } from "antd";
import { useTranslation } from "react-i18next";
import { GET } from "service";
import { FilterBar } from "styles/components";
import Loading from "./loading";
import ListComponent from "./common/ListComponent";
const { Option } = Select;
const HomeList = () => {
  const { t } = useTranslation();
  async function getHotel() {
    const res = await GET("room");
    return res.data;
  }
  const { data, isFetching, isError } = useQuery("get-list", getHotel);
  const roomList = data?.data
  if (isFetching) return <Loading />;
  if (isError) return <Empty />;
  return (
    <>
      <Row
        wrap
        justify="space-between"
        align="center"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <ListComponent items={roomList} />
      </Row>
    </>
  );
};

export default HomeList;
