import styled from "styled-components";
import { Typography, Button } from "antd";
const { Title } = Typography;

export const BoxWrapper = styled.div`
  margin: 40px 0;
`;

export const TitleWrap = styled(Title)`
  font-size: 40px !important;
  margin-top: 20;
`;

export const WrapperBtn = styled(Button)`
  border-radius: 4px !important;
  border: 1px solid;
`;

export const ButtonViewMore = styled.div`
  margin: 20px 0;
  text-align: center;
`;
export const CustomSelection = styled.div`
  .ant-select.ant-select-single.ant-select-show-arrow.ant-select-show-search {
    margin-left: 150px;
    margin-top: 10px

  }
`;

export const CustomSearch = styled.div`
  span.ant-input-affix-wrapper {
    margin-top: 10px;
    width: 300px ;
  }
`;