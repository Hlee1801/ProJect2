import React from 'react'
import useSWR from 'swr'
import { Button, List, ThemeIcon } from '@mantine/core'
import { IconBellPlus } from '@tabler/icons'
import { routes, GET, DELETE } from 'utils'
import { showNotification } from '@mantine/notifications'
const { Item } = List
const Notifications = () => {
  async function getNotifications() {
    const res = await GET(routes.api.notification)
    return res.data
  }
  const { data, mutate } = useSWR('get-noti', getNotifications)
  async function deleteNotification(id: string) {
    const row = data?.filter((item: { _id: string }) => item._id === id)
    const res = await DELETE(`${routes.api.notification}/${row[0]._id}`)
    if (res) {
      showNotification({
        message: 'Xóa thành công',
        title: 'Thông báo',
        color: 'bule',
      })
      await mutate('get-noti')
    }
  }
  return (
    <>
      <h1>Thông báo</h1>
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color={'red'} size={24} radius={'xl'}>
            <IconBellPlus size={16} />
          </ThemeIcon>
        }
      >
        {data&&data?.map((item: { content: string; _id: string }) => (
          <Item key={item._id}>
            {item.content}
            <Button
              variant={'subtle'}
              onClick={() => deleteNotification(item._id)}
            >
              Xóa
            </Button>
          </Item>
        ))}
      </List>
    </>
  )
}

export default Notifications
