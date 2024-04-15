import React from 'react'
import { Rate, Input, Divider, Button, Form, message } from 'antd'
import { GET, POST } from 'service'
import { useSelector } from 'react-redux'
import { checkToken } from 'utils'
const { TextArea } = Input
const CreateComment = (props) => {
  const { roomID } = props
  const { user } = useSelector((state) => state.auth)
  const [form] = Form.useForm()
  const initialValue = {
    room_id: roomID,
    content: '',
    rating: 0,
  }
  async function postComment(value) {
    const expire = await checkToken(user?.access_token)
    const new_token = expire ? expire : user?.access_token
    try {
      const res = await POST('comment', value, new_token)
      if (res) {
        message.success('Thành công')
        await GET(`comment/${roomID}`)
      }
    } catch (error) {
      message.error(error)
    }
  }
  return (
    <div>
      {user && (
        <Form
          layout="vertical"
          form={form}
          initialValues={initialValue}
          onFinish={postComment}
        >
          <Form.Item name={'rating'}>
            <Rate />
          </Form.Item>
          <Divider />
          <Form.Item name={'content'}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item hidden={true} name={'room_id'}>
            <input type={'hidden'} />
          </Form.Item>
          <Button htmlType={'submit'} type={'primary'}>
            Xác nhận
          </Button>
        </Form>
      )}
    </div>
  )
}

export default CreateComment
