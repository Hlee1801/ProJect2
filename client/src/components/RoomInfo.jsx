import React from "react";
import { Image } from "antd";

function RoomInfo(props) {
  const { name, image, price, desc } = props;
  return (
    <div>
      {/*{*/}
      {/*    image.map((i,index)=><Image src={i} key={index}/>)*/}
      {/*}*/}
      <p>{name}</p>
      <p>{image}</p>
      <p>{price}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: desc,
        }}
      />
    </div>
  );
}

export default RoomInfo;
