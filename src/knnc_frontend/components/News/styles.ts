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
