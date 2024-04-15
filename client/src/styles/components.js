import styled from "styled-components";
import { Tag } from "antd";
export const WelComeText = styled.div`
  text-align: center;
`;
export const HomeItemWrapper = styled.div`
  width: 550px;
  img {
    height: 550px;
  }
`;
export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;
export const CustomTag = styled(Tag)`
  width: 100px;
  background: #2fc6c9;
  border-radius: 30px;
`;
export const BookingBodyPage = styled.div``;
export const Contained = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;
export const FilterBar = styled.fieldset`
  width: 100%;
  border: 1px solid #0cdcc3;
  border-radius: 10px;
  padding: 10px;
  margin: 20px 0;
`;
