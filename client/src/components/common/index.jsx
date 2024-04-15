import React from "react";
import styled from "styled-components";
import { WelComeText } from "styles/components";
import { Carousel, Typography, Image } from "antd";
export var Banner = () => {
  let bannerImage = [
    {
      id: 1,
      text: "Hà nội",
      url: "https://vcdn1-dulich.vnecdn.net/2022/05/12/Hanoi2-1652338755-3632-1652338809.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=NxMN93PTvOTnHNryMx3xJw",
    },
    {
      id: 2,

      url: "https://www.tripsavvy.com/thmb/BHG9Xa_H59w8uNR51eldY4jlfP8=/4096x2730/filters:fill(auto,1)/ho-chi-minh-city-at-night-22c7df816ce4493eb0e86cf54fe03309.jpg",
    },
    {
      id: 3,

      url: "https://statics.vinpearl.com/du-lich-da-nang_1657939501.JPG",
    },
    {
      id: 4,

      url: "https://i1-dulich.vnecdn.net/2022/09/19/-4419-1663579681.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=IfYeHWH44jQBGZjZL85foQ",
    },
    {
      id: 5,

      url: "https://i1-dulich.vnecdn.net/2022/09/14/7-1663171465.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=h8Le5dwLusXpKrmsp_op5A",
    },
  ];
  return (
    <BannerStyle>
      <Carousel autoplay>
        {bannerImage.map((img) => (
          <div key={img.id}>
            <img src={img.url} alt="banner_photo" />
          </div>
        ))}
      </Carousel>
    </BannerStyle>
  );
};
const BannerStyle = styled.div`
  img {
    width: 100%;
    height: 650px;
  }
`;
export var HomeWelComeText = () => {
  return (
    <>
      <WelComeText>
        <Typography.Title level={1} italic>
          Cultural Enrichment
        </Typography.Title>
        <Typography.Text italic>
          Be immersed in Vietnam’s rich history and traditions in our 245-acre
          nature and beachfront resort, set on a secluded peninsula of the Phu
          Yen province. Choose ancient rice paddy fields, verdant hilltops or
          mile-long powder white beach as your own private setting, from our
          collection of 73 free-standing villas. Three unique dining
          experiences, expansive Hoa Sen Spa and tailored excursions continue
          the cultural adventure.
        </Typography.Text>
        <Image
          src="https://res.cloudinary.com/dji8eaf4q/image/upload/v1666584063/Booking/Zannier-Hotels-Ba%CC%83i-San-Ho%CC%82-Resort-18-_-Zannier-Hotels_gorfmk.jpg"
          width={"100%"}
        />
      </WelComeText>
      <WelComeText>
        <Typography.Title level={1} italic>
          Centuries-old Architecture
        </Typography.Title>
        <div className="text_box">
          <Typography.Text italic>
            The resort’s 73 pool villas offer total privacy and seclusion,
            fashioned on three distinct
            <br /> Vietnamese architectural styles for each setting: paddy
            fields, hilltop, grand bay and beach.
          </Typography.Text>
        </div>
      </WelComeText>
    </>
  );
};
