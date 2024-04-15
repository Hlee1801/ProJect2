import React from 'react'
import { useQuery } from 'react-query'
import { Comment, List, Rate } from 'antd'
import { GET } from 'service'
import moment from 'moment'

const DisplayComment = (props) => {
  const { roomID } = props
  async function getCommentAndRate() {
    return await GET(`comment/${roomID}`)
  }
  const { data } = useQuery('comment', getCommentAndRate)

  const comments = data?.data?.comments?.map((item) => ({
    avatar: item.user.avatar,
    author: item.user.fullName,
    content: (
      <>
        <Rate defaultValue={item.rating} disabled />
        <p>{item.content}</p>
      </>
    ),
    datetime: <span>{moment(item.createdAt).format('l')}</span>,
  }))
  return (
    <div>
      <List
        header={`${data?.data?.comments.length} bình luận`}
        dataSource={comments}
        itemLayout={'horizontal'}
        renderItem={(item) => (
          <li>
            <Comment
              content={item.content}
              avatar={item.avatar}
              author={item.author}
              datetime={item.datetime}
            />
          </li>
        )}
      />
    </div>
  )
}

export default DisplayComment
