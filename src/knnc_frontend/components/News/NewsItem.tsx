import React from 'react'
import { Tag, Typography } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
const { Text, Title, Link } = Typography;
import { Col, Row } from 'antd';
type Props = {
  item: any,
  alignText?: any
}

const NewsItem = (props: Props) => {
  const { item, alignText } = props;
  return (
    <div style={{ textAlign: alignText }}>
      <img src={'https://picsum.photos/200/300'} alt="" style={{ borderRadius: 10 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
        <Text type="secondary" style={{ textTransform: 'uppercase' }}>ANjknsandjkansdkj</Text>
        <Text type="secondary" style={{ textTransform: 'uppercase' }}>123123</Text>
      </div>
      <Title level={3}>{item.title}</Title>
      <Text strong>{`"${item.quote}"`}</Text>
      <br />
      <Text type="secondary">{item.desc}</Text>
    </div>
  )
}

export default NewsItem