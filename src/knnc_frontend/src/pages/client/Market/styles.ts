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

export const Customspan = styled.span`
  background-color: #42a5f5;
  padding: 10px;
  margin-right: 10px;
  width: 100px;
  border: 1px solid #42a5f5;
  border-radius: 4px ;
  margin-bottom: 10px;
  cursor: pointer;
  color: white;
  
`;
export const WrapperDetails = styled.div`
  margin: 30px 0px ;
  
`

export const Btn = styled.div`
text-align: center ;
margin: 30px 0px 


`
export const CustomP = styled.p`

  margin-top: 30px;
  font-weight: bold;
  border-radius: 4px;

`;



