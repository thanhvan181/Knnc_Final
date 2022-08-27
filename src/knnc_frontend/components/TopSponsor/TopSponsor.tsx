import React from 'react'
import { Typography, List, Row, Button, Col } from 'antd'
const { Title } = Typography;
import * as S from './style'
import TopRank from './components/TopRank';

type Props = {}

const TopSponsor = (props: Props) => {
  return (
    <>
      <S.TitleWrap level={3}>Mạnh thường quân vàng</S.TitleWrap>
      <Row gutter={12} style={{ marginBottom: 30 }}>
        <Col>
          <S.WrapperBtn>Primary Button</S.WrapperBtn>
        </Col>
        <Col>
          <S.WrapperBtn>Primary Button</S.WrapperBtn>
        </Col>
      </Row>
      <TopRank />
    </>
  )
}

export default TopSponsor