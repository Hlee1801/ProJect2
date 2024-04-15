import React, { useEffect, useState } from "react";
import { GET } from "service";
import RoomInfo from "./RoomInfo";
import { List, Card, Image, Modal } from "antd";
import { useQuery } from "react-query";

const ListItem = () => {
  const [state, setState] = useState({
    dataList: [],
  });

  const { dataList } = state;
  const { Meta } = Card;
  useEffect(() => {
    GET("hotel").then((res) =>
      setState((p) => ({
        ...p,
        dataList: res?.data?.data?.map((x) => {
          return {
            id: x._id,
            rName: x.room_name,
            avatar: x.photo,
            desc: x.desc,
            price: x.room_price,
          };
        }),
      }))
    );
  }, []);
  const sortData = dataList.sort((a, b) => a.price - b.price);
  return (
    <div>
      <input
        type="checkbox"
        onChange={() => dataList.sort((a, b) => b.price - a.price)}
      />
      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={sortData}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              style={{ width: 255 }}
              cover={
                <Image
                  src={item.avatar[0]}
                  style={{ width: 255, height: 200 }}
                />
              }
            >
              <Meta
                title={item.rName}
                style={{ textTransform: "capitalize" }}
              />
              <p>{item.price}$/perNight</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ListItem;
