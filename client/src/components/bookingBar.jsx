import React from "react";
import {
  DatePicker,
  Row,
  Input,
  Col,
  Card,
  Select,
  Button,
  Dropdown,
  Menu,
} from "antd";
import {
  GlobalOutlined,
  UserOutlined,
  SearchOutlined,
  CalendarOutlined,
  GoldOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;
const BookingBar = (props) => {
  const getDateValue = (ranges) => {
    const valueOfInput1 = ranges[0].format();
    const valueOfInput2 = ranges[1].format();
  };
  return (
    <Card>
      <Row gutter={16}>
        <Col>
          <RangePicker onChange={getDateValue} />
        </Col>

        <Col>
          <Input
            type="number"
            placeholder="Người lớn"
            prefix={<UserOutlined />}
            min="1"
            style={{ width: "120px" }}
          />
        </Col>
        <Col>
          <Input
            type="number"
            placeholder="Trẻ nhỏ"
            prefix={<UserOutlined />}
            min="1"
            style={{ width: "120px" }}
          />
        </Col>
        <Col>
          <Button type="primary" icon={<SearchOutlined />}>
            Tìm
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default BookingBar;
