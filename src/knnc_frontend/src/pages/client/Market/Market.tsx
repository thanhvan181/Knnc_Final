import { SearchOutlined } from "@ant-design/icons";
import { Principal } from "@dfinity/principal";
import { Col, Input, List, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { knnc_backend } from "../../../../../declarations/knnc_backend";
import MarketItem from "../../../../components/Market/MarketItem";
import * as S from "./styles";
type Props = {};
const { Option } = Select;
const Market = (props: Props) => {
  const [data, setData] = useState([])
  useEffect(() => {
    (async () => {
      let nfts = await knnc_backend.getAllTokens()
      nfts.forEach(e => {
        let temp = {
          imageUrl: e.tokenMetadata.tokenUri,
          user: Principal.from(e.owner).toString(),
          name: e.tokenMetadata.tokenName,
          price: e.price,
          id : e.index
        }
        setData([...data, temp])
      })
    })()
  }, [])

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  return (
    <S.BoxWrapper>
      <Row gutter={12}>
        <Col span={12}>
          <S.TitleWrap level={3}>
            <span
              style={{
                color: "#fbc02d",
              }}
            >
              Kết nối nụ cười
            </span>{" "}
            - Chợ tình thương
          </S.TitleWrap>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Col span={6}>
              <Select
                showSearch
                placeholder="Giá"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                style={{ width: 160, marginTop: 10 }}
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Col>

            <Col span={12}>
              <Input
                style={{ marginTop: 10 }}
                placeholder="Nhập từ khoá..."
                prefix={<SearchOutlined />}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <List
        grid={{ gutter: 30, column: 4 }}
        dataSource={data}
        renderItem={(item) => {
          return (
            <List.Item>
              <MarketItem item={item} />
            </List.Item>
          );
        }}
      />
      <S.ButtonViewMore>
        <S.WrapperBtn>View More</S.WrapperBtn>
      </S.ButtonViewMore>
    </S.BoxWrapper>
  );
};

export default Market;
