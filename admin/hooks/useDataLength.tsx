import React, { useEffect, useState } from 'react';
import { routes, GET } from 'utils';
import { getAllUserProfile, getRoomList } from 'utils/service';

export const useDataLength = () => {
  const [state, setState] = useState({
    userList: [],
    hotelList: [],
    bookingList: [],
  });
  const { userList, hotelList, bookingList } = state;
  useEffect(() => {
    getAllUserProfile().then((res) => {
      setState((o) => ({
        ...o,
        userList: res?.data?.user?.map((item: any) => {
          return {
            id: item?._id,
            name: item?.fullName,
          };
        }),
      }));
    });
  }, []);
  useEffect(() => {
    getRoomList().then((res) => {
      setState((o) => ({
        ...o,
        hotelList: res?.data?.map((item: any) => {
          return {
            id: item?._id,
            name: item?.room_name,
          };
        }),
      }));
    });
  }, []);
  useEffect(() => {
    GET(routes.api.booking_list).then((res) =>
      setState((p) => ({
        ...p,

        bookingList: res?.data?.map(
          (item: { _id: string; billing: number }) => {
            return {
              id: item?._id,
              invoice: item.billing,
            };
          },
        ),
      })),
    );
  }, []);
  const monthInvoice = bookingList?.reduce(
    (a: number, b: { invoice: number }) => a + b.invoice,
    0,
  );

  return {
    userList: userList.length,
    hotelList: hotelList,
    bookingList: bookingList,
    totalInvoice: monthInvoice,
  };
};
