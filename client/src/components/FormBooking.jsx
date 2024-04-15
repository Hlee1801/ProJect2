import React, { useState} from 'react'
import { useSelector } from 'react-redux'
import {
  Typography,
  DatePicker,
  Row,
  Col,
  Form,
  message,
  Button,
  InputNumber,
  Divider,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { timeBetween } from 'utils'
import { POST } from 'service'
import moment from 'moment'

const { Title, Text } = Typography
const { RangePicker } = DatePicker
const FormBooking = ({
  roomID,
  roomPrice,
  success,
  startOff,
  endOff,
  roomName,
}) => {
  const [state, setState] = useState({
    bill: 0,
    adult: 1,
    child: 0,
    begin: '',
    end: '',
  })
  const { bill, adult, child, begin, end } = state
  const [loadings, setLoadings] = useState([])
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[index] = false
        return newLoadings
      })
    }, 6000)
  }
  const { user } = useSelector((state) => state.auth)
  const [form] = Form.useForm()

  const { t } = useTranslation()

  const initFormValue = {
    start_date: '',
    end_date: '',
    adult_quantity: 1,
    children_quantity: 0,
    room: roomID,
    user: user.user._id,
    email: user.user.email,
    billing: 0,
    room_name: roomName,
    customer_name: user.user.fullName,
  }

  const onChooseDate = (_, dateString) => {
    const days = timeBetween(dateString[0], dateString[1]) + 1
    setState((p) => ({
      ...p,
      begin: dateString[0],
      end: dateString[1],
      bill: days*roomPrice,
    }))
    form.setFieldsValue({
      start_date: dateString[0],
      end_date: dateString[1],
      billing: days*roomPrice,
    })
  }
  async function postNewBooking(value) {
    try {
      const res = await POST('new-booking', value)
      if (res.status === 200) {
        form.resetFields()
        message.success(t('noti.success'))
        success()
      }
    } catch (e) {
      message.error(e.response.data.msg)
    }
  }

  return (
    <div>
      <div>
        <Title level={4}>Chọn ngày</Title>
        <RangePicker
          format="YYYY-MM-DD"
          onChange={onChooseDate}
          disabledDate={(current) =>
            current.isBefore(moment().subtract(1, 'day'))
          }
          size={'large'}
          style={{ width: 480 }}
        />
        <Divider />
        <Form
          initialValues={initFormValue}
          form={form}
          onFinish={postNewBooking}
          layout={'vertical'}
        >
          <Row>
            <Col span={12}>
              <Form.Item name={'adult_quantity'} label={'Người lớn'}>
                <InputNumber
                  min={1}
                  onChange={(v) => setState((p) => ({ ...p, adult: v }))}
                  style={{ width: 220 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={'children_quantity'} label={'Trẻ em'}>
                <InputNumber
                  min={1}
                  onChange={(v) => setState((p) => ({ ...p, child: v }))}
                  style={{ width: 240 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <>
            <Form.Item hidden={true} name={'start_date'}>
              <input type={'hidden'} />
            </Form.Item>
            <Form.Item hidden={true} name={'end_date'}>
              <input type={'hidden'} />
            </Form.Item>
            <Form.Item hidden={true} name={'user'}>
              <input type={'hidden'} />
            </Form.Item>
            <Form.Item hidden={true} name={'email'}>
              <input type={'hidden'} />
            </Form.Item>
            <Form.Item hidden={true} name={'room'}>
              <input type={'hidden'} />
            </Form.Item>
            <Form.Item hidden={true} name={'billing'}>
              <input type={'hidden'} />
            </Form.Item>{' '}
            <Form.Item hidden={true} name={'room_name'}>
              <input type={'hidden'} />
            </Form.Item>{' '}
            <Form.Item hidden={true} name={'customer_name'}>
              <input type={'hidden'} />
            </Form.Item>
          </>
          <div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '10px 0',
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
          <Button
            htmlType={'submit'}
            type={'primary'}
            loading={loadings[2]}
            onClick={() => enterLoading(2)}
          >
            Xác nhận & Thanh toán
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default FormBooking
