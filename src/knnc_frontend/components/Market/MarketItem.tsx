import React, { useState } from 'react'
import { Tag, Typography, Image, Row, Col, Popover, Button, Divider } from 'antd';
import { EyeOutlined, ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
const { Text, Title, Link } = Typography;
import * as S from './styles'


const PopOver: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };
  const handleViewNFT = () => {

  }
  const handleBuyNFT = () => {

  }
  return (
    <Popover
      content={
        <S.WrapPopUp>
          <S.PopupItemTop onClick={handleViewNFT}>
            <EyeOutlined style={{ color: 'white', marginRight: 12, fontSize: '24px' }} /> Xem NFT
          </S.PopupItemTop>
          <S.PopupItemBottom onClick={handleBuyNFT}>
            <ShoppingCartOutlined style={{ color: 'white', marginRight: 12, fontSize: '24px' }} /> Mua NFT
          </S.PopupItemBottom>
        </S.WrapPopUp>
      }
      placement="bottomRight"
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <MenuOutlined style={{ fontSize: '32px', cursor: 'pointer' }} />
    </Popover>
  );
};

const MarketItem = ({ item }) => {
  return (
    <div>
      <S.ImageWrapper>
        <Image width={300} height={300} src="https://picsum.photos/400/400"
        />
      </S.ImageWrapper>
      <S.RowWrapper justify='space-between'>
        <Col>
          <Text type="secondary" style={{ textTransform: 'uppercase' }}>asdnkjasndjkbnakj</Text>
        </Col>
        <Col>
          <Text strong style={{ color: '#fbc02d' }}>1231231</Text>
        </Col>
      </S.RowWrapper>
      <S.RowMargin>
        <Row justify='space-between'>
          <Col>
            <Title level={3}>User 1</Title>
          </Col>
          <Col>
            <PopOver />
          </Col>
        </Row>
      </S.RowMargin>
    </div>
  )
}

export default MarketItem