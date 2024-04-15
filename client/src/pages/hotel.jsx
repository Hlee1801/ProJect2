import React, { useState} from 'react'
import { DatePicker, Typography, Row } from 'antd'
import { GET } from 'service'
import ListComponent from 'components/common/ListComponent'
import { useQuery } from 'react-query'
import moment from 'moment/moment'
const { RangePicker } = DatePicker
const { Title } = Typography
const Hotel = () => {
  const [state, setState] = useState({
    haveBooking: [],
  })
  const { haveBooking } = state

  async function getAll() {
    const res = await GET('room')
    return res.data?.data
  }
  const { data } = useQuery('get-room', getAll)

  const handleChangeDate = async (_, dateString) => {
    await GET(`valid-booking/${dateString[0]}&${dateString[1]}`).then((res) =>
      setState((p) => ({
        ...p,
        haveBooking: data?.filter((i) => {
          return !res?.data?.booking?.find((e) => {
            return e.room === i._id
          })
        }),
      })),
    )
  }
  return (
    <div className="container">
      <div>
        <Title level={3}>Chọn ngày</Title>
        <div style={{ marginBottom: '.3rem' }}>
          <RangePicker
            size={'large'}
            disabledDate={(current) =>
              current.isBefore(moment().subtract(1, "day"))
            }
            onChange={handleChangeDate}
          />
        </div>
        {haveBooking?.length !== 0 && (
          <Row
            wrap
            justify="space-between"
            align="center"
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <ListComponent items={haveBooking} />
          </Row>
        )}
      </div>
    </div>
  )
}

export default Hotel
