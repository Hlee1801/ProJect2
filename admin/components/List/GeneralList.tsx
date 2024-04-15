import React, { useState } from 'react';
import useSWR from 'swr';
import { GET, IRoom, routes } from 'utils';
import {
  Table,
  ScrollArea,
  Modal,
  UnstyledButton,
  Image,
  TypographyStylesProvider,
  Badge,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';

type userT = {
  _id: string;
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string | number;
  gender: string;
};
export const UserList = () => {
  async function getListUser() {
    const res = await GET(routes.api.user);
    return res;
  }
  const { data } = useSWR('list-user', getListUser);

  const list = data?.user?.map((item: userT, index: number) => (
    <tr key={item._id}>
      <td>{index + 1}</td>
      <td>{item.fullName}</td>
      <td>{item.email}</td>
      <td>{item.address}</td>
      <td>{item.phoneNumber}</td>
      <td>{item.gender}</td>
    </tr>
  ));
  return (
    <ScrollArea>
      <Table sx={{ maxWidth: 800 }}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>SDT</th>
            <th>Giới tính</th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </Table>
    </ScrollArea>
  );
};
export let RoomList = () => {
  const [state, setState] = useState({
    modal: false,
    desc: {} as IRoom,
  });
  const { modal, desc } = state;
  const getListRoom = async () => {
    const res = await GET(routes.api.room);
    return res;
  };
  const { data } = useSWR('list-room', getListRoom);
  function openDescModal(id: string) {
    const specificRow = data?.data?.filter(
      (i: { _id: string }) => i._id === id,
    );

    setState((p) => ({ ...p, modal: true, desc: specificRow[0] }));
  }
  const list = data?.data?.map((item: IRoom, index: number) => (
    <tr key={item._id}>
      <td>{index + 1}</td>
      <td>{item.room_name}</td>
      <td>{item.room_type}</td>
      <td>{item.room_price}$</td>
      <td>{item.location}</td>
      <td>{item.featured.join(',')}</td>
      <td>
        {item.photo && (
          <Carousel sx={{ width: 200, height: 120 }} loop>
            {item.photo?.map((n: any, index: number) => {
              return (
                <Carousel.Slide key={index}>
                  <Image
                    src={n}
                    radius="md"
                    alt="photo"
                    width={200}
                    height={120}
                  />
                </Carousel.Slide>
              );
            })}
          </Carousel>
        )}
      </td>
      <td>
        <UnstyledButton
          onClick={() => openDescModal(item._id)}
          style={{ color: 'blue', textDecoration: 'underline' }}
        >
          xem chi tiết
        </UnstyledButton>
      </td>
    </tr>
  ));
  return (
    <div>
      <ScrollArea>
        <Table sx={{ minWidth: 700 }}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Hạng</th>
              <th>Giá</th>
              <th>Vị trí</th>
              <th>Dịch vụ</th>
              <th>Gallery</th>
              <th>Mô tả</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </Table>
      </ScrollArea>
      <Modal
        opened={modal}
        onClose={() => setState((p) => ({ ...p, modal: false }))}
      >
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: desc.desc }} />
        </TypographyStylesProvider>
      </Modal>
    </div>
  );
};
type bookingL = {
  _id: string;
  customer_name: string;
  email: string;
  room_name: string;
  start_date: string | Date;
  end_date: string | Date;
  adult_quantity: number;
  children_quantity: number;
  billing: number;
  status: string;
};
export var BookingList = () => {
  const getListBooking = async () => {
    const res = await GET(routes.api.booking_list);
    return res.data;
  };
  const { data } = useSWR('list-booking', getListBooking);
  // console.log(data);
  return (
    <div className={'mt'}>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} withBorder highlightOnHover>
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
            </tr>
          </thead>
          <tbody>
            {data?.map((item: bookingL, index: number) => (
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
                    color={item.status === 'pending' ? 'yellow' : 'blue'}
                  >
                    {item.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </div>
  );
};
