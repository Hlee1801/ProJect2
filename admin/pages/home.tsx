import React from 'react'
import type { NextPage } from 'next'
import StatCard from 'components/common/StatCard'
import Invoice from 'components/common/Invoice'
import { useDataLength } from 'hooks'
import { SimpleGrid, Box, Stack, Accordion } from '@mantine/core'
import { UserList, RoomList, BookingList } from 'components/List'
import Fakechart from 'components/chart/fakechart'
import Notifications from '../components/Noti'
const { Item, Control, Panel } = Accordion

const Home: NextPage = () => {
  const { userList, hotelList, bookingList, totalInvoice } = useDataLength()
  return (
    <>
      <Box>
        <Stack>
          <Notifications />
          <Accordion variant={'filled'}>
            <Item value={'user'}>
              <Control>
                <StatCard length={userList} listName="Người dùng" />
              </Control>
              <Panel>
                <UserList />
              </Panel>
            </Item>
            <Item value={'room'}>
              <Control>
                <StatCard length={hotelList.length} listName="Phòng" />
              </Control>
              <Panel>
                <RoomList />
              </Panel>
            </Item>
          </Accordion>
          <Accordion>
            <Item value={'booking'}>
              <Control>
                <StatCard
                  length={bookingList.length}
                  listName="Lịch đặt phòng"
                />
              </Control>
              <Panel>
                <BookingList />
              </Panel>
            </Item>
          </Accordion>
        </Stack>
        <div className="mt">
          <Invoice count={totalInvoice} title={'Tổng doanh thu'} />
        </div>
        {/* <Fakechart /> */}
      </Box>
    </>
  )
}

export default Home
