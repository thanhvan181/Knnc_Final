import React from 'react'
import { Tag, Typography } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
const { Text, Title, Link } = Typography;
type Props = {
  item: any,
}

const MarketItem = (props: Props) => {
  const { item } = props;
  return (
    <div>
      <img src={item.imageUrl} alt="" style={{ borderRadius: 4 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
        <Text type="secondary" style={{ textTransform: 'uppercase' }}>{item.tag}</Text>
        <div>
          <MenuOutlined />
        </div>
      </div>
      <Title level={3}>{item.title}</Title>
      <Text strong>{`"${item.quote}"`}</Text>
      <br />
      <Text type="secondary">{item.desc}</Text>
    </div>
  )
}

export default MarketItem