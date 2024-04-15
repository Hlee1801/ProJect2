import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  DatePicker,
  Row,
  Col,
  Form,
  Modal,
  Button,
  InputNumber,
  Divider,
} from "antd";
import { useTranslation } from "react-i18next";
import { timeBetween } from "utils";

import moment from "moment";
import FormLogin from "components/FormLogin";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const DemoBooking = ({
  roomID,
  roomPrice,
  roomName,
}) => {
  const [state, setState] = useState({
    bill: 0,
    adult: 1,
    child: 0,
    begin: "",
    end: "",
    open:false
  });
  const { bill, adult, child, begin, end ,open} = state;
  const [form] = Form.useForm();



  

  const onChooseDate = (_, dateString) => {
    const days = timeBetween(dateString[0], dateString[1]) + 1;
    setState((p) => ({
      ...p,
      begin: dateString[0],
      end: dateString[1],
      bill: days * roomPrice,
    }));
    
  };
  

  return (
    <div>
      <div>
        <Title level={4}>Chọn ngày</Title>
        <RangePicker
          format="YYYY-MM-DD"
          onChange={onChooseDate}
          disabledDate={(current) =>
            current.isBefore(moment().subtract(1, "day"))
          }
          size={"large"}
          style={{ width: 480 }}
        />
        <Divider />
        <Form
          form={form}
          layout={"vertical"}
        >
          <Row>
            <Col span={12}>
              <Form.Item name={"adult_quantity"} label={"Người lớn"}>
                <InputNumber
                  min={1}
                  onChange={(v) => setState((p) => ({ ...p, adult: v }))}
                  style={{ width: 220 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={"children_quantity"} label={"Trẻ em"}>
                <InputNumber
                  min={1}
                  onChange={(v) => setState((p) => ({ ...p, child: v }))}
                  style={{ width: 240 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
         
          <div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Text>Ngày bắt đầu:</Text>
                  <Text>{begin}</Text>
                </div>
                <div>
                  <Text>Ngày kết thúc:</Text>
                  <Text>{end}</Text>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px 0",
                }}
              >
                <Text>Số lượng người lớn: {adult} </Text>
                <Text>Số lượng trẻ em: {child} </Text>
              </div>
              <div>
                Tổng tiền:
                <Text strong>{bill}$</Text>
              </div>
            </div>
          </div>
          <Divider />
          
          <Button type='primary' onClick={()=>setState(p=>({...p,open:true}))}>
          Đăng nhập để đặt phòng
          </Button>
          
        </Form>
        <Modal
        open={open}
        onCancel={()=>setState(p=>({...p,open:false}))}
         onClose={() => setState((p) => ({ ...p, open: false }))}
         footer={null}
         title='Đăng nhập'
        >
        <FormLogin/>
        </Modal>
      </div>
    </div>
  );
};

export default DemoBooking;
