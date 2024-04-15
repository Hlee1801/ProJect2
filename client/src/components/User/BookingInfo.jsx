import React from 'react'
import { GET, POST, DELETE } from 'service'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { Button, message, Table, Tag, Modal, Tooltip, Row, Col } from 'antd'

import Loading from '../loading'
import moment from 'moment'
import { DeleteOutlined } from '@ant-design/icons'

const BookingInfo = () => {
  const [open, setOpen] = React.useState(false)
  const [row, setRow] = React.useState({})
  const { user } = useSelector((state) => state.auth)

  async function getBookingList() {
    try {
      return await GET(`get-user-booking/${user.user._id}`)
    } catch (e) {
      message.error(e)
    }
  }
  const { data, isFetching, refetch } = useQuery('booking-list', getBookingList)
  const list = data?.data?.booking.map((item) => ({
    key: item._id,
    start_date: moment(item.start_date).format('dddd, MMMM Do YYYY'),
    end_date: moment(item.end_date).format('dddd, MMMM Do YYYY'),
    adult_quantity: item.adult_quantity,
    children_quantity: item.children_quantity,
    billing: `${item.billing}$`,
    room: item.room?.[0],
    status: item.status,
  }))
  function getRow(id) {
    const specificRow = list?.filter((item) => item.key === id.key)
    setRow(specificRow[0])
    setOpen(true)
  }
  const cancelBooking = async () => {
    try {
      await POST('notification', {
        content: `${
          user.user.fullName
        } đã hủy lịch đặt phòng từ ngày ${new Date(
          row.start_date,
        ).toISOString()}tới ${new Date(row.end_date).toISOString()}`,
      })
      const res = await DELETE(`delete-booking/${row.key}`)
      if (res) {
        message.success('Hủy thành công')
        setOpen(false)
        await refetch()
      }
    } catch (e) {
      message.error(e)
    }
  }
  const columns = [
    {
      title: 'Ngày bắt đầu',
      key: 'start',
      dataIndex: 'start_date',
    },
    {
      title: 'Ngày kết thúc',
      key: 'end',
      dataIndex: 'end_date',
    },
    {
      title: 'Số lượng người lớn',
      key: 'adult',
      dataIndex: 'adult_quantity',
    },
    {
      title: 'Số lượng trẻ em',
      key: 'child',
      dataIndex: 'children_quantity',
    },
    {
      title: 'Tổng tiền',
      key: 'bill',
      dataIndex: 'billing',
    },
    {
      title: 'Phòng',
      key: 'room',
      dataIndex: 'room',
      render: (room) => (
        <Link to={`/detail/${room._id}`}>{room.room_name}</Link>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (status, key) => (
        <>
          <Tag
            color={
              status === 'pending'
                ? 'yellow'
                : status === 'confirm'
                ? 'blue'
                : 'red'
            }
          >
            {status === 'pending' ? 'Chờ xác nhận' : 'Đã Xác nhận'}
          </Tag>
          {status !== 'confirm' && (
            <Tooltip title={'Bạn có thể hủy lịch đặt phòng trong 24h'}>
              <Button
                type={'primary'}
                danger
                onClick={() => getRow(key)}
                icon={<DeleteOutlined />}
              >
                Hủy
              </Button>
            </Tooltip>
          )}
        </>
      ),
    },
  ]
  if (isFetching) return <Loading />
  return (
    <>
      <Table columns={columns} dataSource={list} />
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title={'Bạn có chắc muôn hủy ?'}
      >
        <Row justify={'space-between'} align={'center'}>
          <Col>
            <Button type={'ghost'} onClick={() => setOpen(false)}>
              Không Hủy
            </Button>
          </Col>
          <Col>
            <Button danger type={'primary'} onClick={cancelBooking}>
              Hủy
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default BookingInfo
