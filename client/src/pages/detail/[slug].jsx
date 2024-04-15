import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Typography,
  Modal,
  Button,
  Image,
  Empty,
  Divider,
  Row,
  Col,
} from 'antd'
import { GET } from 'service'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import FormLogin from 'components/FormLogin'
import FormBooking from 'components/FormBooking'
import { useTranslation } from 'react-i18next'
import Comment from 'components/Comment/CreateComment'
import Loading from 'components/loading'
import DisplayComment from 'components/Comment/DisplayComment'
import DemoBooking from 'components/common/DemoBooking'
const { Title, Text } = Typography
const DetailRoom = () => {
  const [state, setState] = React.useState({
    open: false,
    start: '',
    end: '',
  })
  const [visible, setVisible] = React.useState(false)
  const { open, start, end } = state
  const { slug } = useParams()
  const { user } = useSelector((state) => state.auth)
  const { t } = useTranslation()
  const getDetailRoom = async () => {
    if (slug) {
      const res = await GET(`/room/${slug}`)
      return res.data.room
    }
  }
  const { data, isFetching, isError } = useQuery('get-detail', getDetailRoom)
  useEffect(() => {
    GET(`get-room-booking/${slug}`).then((res) =>
      setState((p) => ({
        ...p,
        start: res.data.booking?.[0]?.start_date,
        end: res.data.booking?.[0]?.end_date,
      })),
    )
  }, [slug])
  if (isFetching) return <Loading />
  if (isError) return <Empty />
  return (
    <div className="container">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={1} style={{ textTransform: 'capitalize' }}>
          {data.room_name}
        </Title>
        <Button onClick={() => setState((p) => ({ ...p, open: true }))}>
          {t('common.booking')}
        </Button>
      </div>

      <Row>
        <Col span={12}>
          <Title level={1}>Gallery</Title>
          <Image
            preview={{ visible: false }}
            src={data.photo[0]}
            onClick={() => setVisible(true)}
            style={{ width: 450 }}
          />
          <div style={{ display: 'none' }}>
            <Image.PreviewGroup
              preview={{ visible, onVisibleChange: (v) => setVisible(v) }}
            >
              {data.photo.map((img, index) => (
                <Image src={img} key={index} />
              ))}
            </Image.PreviewGroup>
          </div>
        </Col>
        <Col span={12}>
          <Title level={2} style={{ marginTop: 43 }}>
            {t('common.feature')}
          </Title>
          <ul>
            {data.featured?.map((i, index) => (
              <li key={index} style={{ fontSize: '16px' }}>
                {i}
              </li>
            ))}
          </ul>
          <Title level={2}>{t('common.price')} </Title>
          <Text style={{ fontSize: '25px' }}>{data.room_price} $</Text>
        </Col>
      </Row>
      <Divider />
      <Title level={1} style={{ fontWeight: 'bold' }}>
        {t('common.desc')}
      </Title>

      <div
        dangerouslySetInnerHTML={{
          __html: data.desc,
        }}
      />
      <>
        <DisplayComment roomID={slug} />
        <Comment roomID={slug} />
      </>
      {user ? (
        <Modal
          open={open}
          onClose={() => setState((p) => ({ ...p, open: false }))}
          onCancel={() => setState((p) => ({ ...p, open: false }))}
          title="Thông tin đặt phòng"
          footer={null}
        >
          <FormBooking
            roomID={data._id}
            roomPrice={data.room_price}
            success={() => setState((p) => ({ ...p, open: false }))}
            startOff={start}
            endOff={end}
            roomName={data.room_name}
          />
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={() => setState((p) => ({ ...p, open: false }))}
          onCancel={() => setState((p) => ({ ...p, open: false }))}
          title={t('common.login')}
          footer={null}
        >
          <DemoBooking
            roomPrice={data.room_price}
          
          />
        </Modal>
      )}
    </div>
  )
}

export default DetailRoom
