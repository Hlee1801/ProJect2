import React from 'react';
import { Tabs, Title } from '@mantine/core';
import { BookingList } from 'components/List';
function ManageBooking() {
  return (
    <div>
      <Title>Quản lý lịch đặt phòng</Title>
      <BookingList />
    </div>
  );
}

export default ManageBooking;
