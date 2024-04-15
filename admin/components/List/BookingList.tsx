import React, { useRef } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { GET, routes, PUT, DELETE,getBookingList } from 'utils'
import { useDataLength } from 'hooks'
import { Table, ScrollArea, Badge, Tooltip, Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useReactToPrint } from 'react-to-print'
import { IconPrinter } from '@tabler/icons'

type bookingL = {
  _id: string
  customer_name: string
  email: string
  room_name: string
  start_date: string | Date
  end_date: string | Date
  adult_quantity: number
  children_quantity: number
  billing: number
  status: string
}
const BookingList = () => {
 
  const { data, mutate } = useSWR('list-booking', getBookingList)
  
  
  const { pathname } = useRouter()
  const { totalInvoice } = useDataLength()
  const tableRef = useRef(null)
  const print = useReactToPrint({
    content: () => tableRef.current,
  })
  const confirmBooking = async (
    bookingID: string,
    value: string,
    reason: string,
    mail: string,
  ) => {
    const res = await PUT(`/api/change-booking-status/${bookingID}`, {
      status: value,
      content: reason,
      email: mail,
    })
    if (res.status === 200) {
      showNotification({
        title: 'Thành công',
        color: 'blue',
        message: 'Cập nhập trạng thái thành công',
      })
      await mutate('list-booking')
    }
  }
  const deleteBooking = async (
    id: string,
    value: string,
    reason: string,
    mail: string,
  ) => {
    await PUT(`/api/change-booking-status/${id}`, {
      status: value,
      content: reason,
      email: mail,
    })
    const res = await DELETE(`/api/delete-booking/${id}`)
    if (res) {
      showNotification({
        title: 'Thành công',
        color: 'blue',
        message: 'Xóa thành công',
      })
      await mutate('list-booking')
    }
  }
  const deleteAfterConfirm = async (id: string) => {
    try {
      const res = await DELETE(`/api/delete-booking/${id}`)
      if (res) {
        showNotification({
          title: 'Thành công',
          color: 'blue',
          message: 'Xóa thành công',
        })
        await mutate('list-booking')
      }
    } catch (error: any) {
      showNotification({
        title: 'Lỗi',
        color: 'red',
        message: error,
      })
    }
  }

  return (
    <>
      <Button onClick={print} leftIcon={<IconPrinter />}>
        Xuất file pdf
      </Button>
      <div className={'mt'}>
        <ScrollArea>
          <Table
            sx={{ minWidth: 800 }}
            withBorder
            highlightOnHover
            withColumnBorders
            ref={tableRef}
          >
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên khách hàng</th>
                <th>Email khách hàng</th>
                <th>Phòng</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Số lượng người lớn</th>
                <th>Số lượng trẻ em</th>
                <th>Tổng bill</th>
                <th>Trạng thái</th>
                {pathname === '/manageBooking' && (
                  <th style={{ textAlign: 'center' }}>Hành động</th>
                )}
              </tr>
            </thead>
            <tbody>
              {
                data?.data?.map((item: bookingL, index: number) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.customer_name}</td>
                    <td>{item.email}</td>
                    <td>{item.room_name}</td>
                    <td>{new Date(item.start_date).toLocaleDateString()}</td>
                    <td>{new Date(item.end_date).toLocaleDateString()}</td>
                    <td>{item.adult_quantity}</td>
                    <td>{item.children_quantity}</td>
                    <td>{item.billing}$</td>
                    <td>
                      <Badge
                        component={'button'}
                        color={
                          item.status === 'pending'
                            ? 'yellow'
                            : item.status === 'confirm'
                            ? 'blue'
                            : 'red'
                        }
                      >
                        {item.status === 'pending'
                          ? 'Chờ xác nhận'
                          : item.status === 'confirm'
                          ? 'Đã xác nhận'
                          : 'Đã từ chối'}
                      </Badge>
                    </td>
                    {pathname === '/manageBooking' && (
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex' }}>
                          {item.status !== 'confirm' && (
                            <Button
                              variant="subtle"
                              onClick={() =>
                                confirmBooking(
                                  item._id,
                                  'confirm',
                                  `Xin chào ${item.email}, lịch đặt phỏng của bạn từ ngày ${new Date(item.start_date).toLocaleDateString()}tới ${new Date(item.end_date).toLocaleDateString()} đã được xác nhận`,
                                  item.email,
                                )
                              }
                            >
                              Xác nhận
                            </Button>
                          )}
                   
                          {item.status === 'confirm' ? (
                            <Button color="red" variant="subtle" onClick={()=>deleteAfterConfirm(item._id)}>
                              Xóa
                            </Button>
                          ): <Button
                            color="red"
                            variant="subtle"
                            onClick={() =>
                              deleteBooking(
                                item._id,
                                'reject',
                                `Xin chào ${item.email}, lịch đặt phỏng của bạn từ ngày ${new Date(item.start_date).toLocaleDateString()}tới ${new Date(item.end_date).toLocaleDateString()} đã bị từ chối`,
                                item.email,
                              )
                            }
                          >
                            Từ chối
                          </Button>
                          
                          }
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </Table>
        </ScrollArea>
      </div>
    </>
  )
}

export default BookingList
